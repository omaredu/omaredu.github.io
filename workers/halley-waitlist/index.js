async function readJson(message, limit) {
  const reader = message.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handleSignup(request, env, craftFetch = fetch) {
  const origin = request.headers.get("Origin");
  const headers = { "Cache-Control": "no-store", Vary: "Origin" };
  const respond = (status, body) => Response.json(body, { status, headers });
  if (new URL(request.url).pathname !== "/signup") return respond(404, { ok: false });
  if (!origin || !env.ALLOWED_ORIGINS.split(",").includes(origin)) {
    return respond(403, { ok: false });
  }
  headers["Access-Control-Allow-Origin"] = origin;
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: {
      ...headers,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    } });
  }
  if (request.method !== "POST") return respond(405, { ok: false });
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
    return respond(415, { ok: false });
  }
  let email;
  try {
    const body = await readJson(request, 1024);
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return respond(400, { ok: false });
  }
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    return respond(400, { ok: false });
  }
  let stage = "rate_limit";
  try {
    const rate = await env.SIGNUP_LIMITER.limit({
      key: request.headers.get("CF-Connecting-IP") || "unknown",
    });
    if (!rate.success) {
      headers["Retry-After"] = "60";
      return respond(429, { ok: false });
    }
    if (!env.CRAFT_API_URL) return respond(503, { ok: false });
    const base = new URL(env.CRAFT_API_URL.replace(/\/$/, "") + "/");
    if (base.protocol !== "https:" || base.hostname !== "connect.craft.do") {
      return respond(503, { ok: false });
    }
    const endpoint = new URL(`collections/${env.CRAFT_COLLECTION_ID}/items`, base);
    const craftHeaders = { "Content-Type": "application/json" };
    if (env.CRAFT_API_TOKEN) craftHeaders.Authorization = `Bearer ${env.CRAFT_API_TOKEN}`;
    const signal = AbortSignal.timeout(10000);
    stage = "read_items";
    const existingResponse = await craftFetch(`${endpoint}?maxDepth=0`, {
      headers: craftHeaders, signal, redirect: "manual",
    });
    if (!existingResponse.ok) throw new Error("Craft read failed");
    const existing = await readJson(existingResponse, 2 * 1024 * 1024);
    if (!Array.isArray(existing.items)) throw new Error("Invalid Craft response");
    if (existing.items.some((item) => item.email?.trim().toLowerCase() === email)) {
      return respond(200, { ok: true });
    }
    stage = "write_item";
    const response = await craftFetch(endpoint, {
      method: "POST", headers: craftHeaders, signal, redirect: "manual",
      body: JSON.stringify({ items: [{
        email,
        properties: {
          date_added: new Date().toISOString().slice(0, 10),
          status: "Requested",
          source: "omaredu.com / Halley",
        },
      }] }),
    });
    if (!response.ok) throw new Error("Craft write failed");
    const saved = await readJson(response, 64 * 1024);
    if (!saved.items?.[0]?.id) throw new Error("Craft did not confirm item");
    return respond(200, { ok: true });
  } catch (error) {
    // Never log emails, Craft URLs, credentials, or upstream response bodies.
    console.error(JSON.stringify({ event: "waitlist_submission_failed", stage, type: error.name }));
    return respond(502, { ok: false });
  }
}

export default { fetch: (request, env) => handleSignup(request, env) };
