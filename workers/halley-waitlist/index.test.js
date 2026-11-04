import test from "node:test";
import assert from "node:assert/strict";
import { handleSignup } from "./index.js";

const env = {
  ALLOWED_ORIGINS: "https://omaredu.com",
  CRAFT_API_URL: "https://connect.craft.do/link/test/api/v1",
  CRAFT_COLLECTION_ID: "waitlist",
  SIGNUP_LIMITER: { limit: async () => ({ success: true }) },
};
function request(body = { email: "Beta@Example.com " }, origin = "https://omaredu.com") {
  return new Request("https://worker.example/signup", {
    method: "POST", headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
const noFetch = () => { throw new Error("Unexpected upstream call"); };

test("writes the normalized email and metadata, then confirms success", async () => {
  const calls = [];
  const response = await handleSignup(request(), env, async (url, init) => {
    calls.push({ url, init });
    return Response.json(calls.length === 1 ? { items: [] } : { items: [{ id: "saved" }] });
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://omaredu.com");
  const item = JSON.parse(calls[1].init.body).items[0];
  assert.equal(item.email, "beta@example.com");
  assert.equal(item.properties.status, "Requested");
  assert.equal(item.properties.source, "omaredu.com / Halley");
  assert.match(item.properties.date_added, /^\d{4}-\d{2}-\d{2}$/);
});

test("repeat requests do not add another row or reset an invitation", async () => {
  let calls = 0;
  const response = await handleSignup(request(), env, async () => {
    calls++;
    return Response.json({ items: [{ email: "beta@example.com", properties: { status: "Invited" } }] });
  });
  assert.equal(response.status, 200);
  assert.equal(calls, 1);
});

test("rejects invalid emails, unexpected origins, and oversized bodies", async () => {
  for (const body of [{ email: "invalid" }, { email: null }, null, { email: "x".repeat(2000) }]) {
    assert.equal((await handleSignup(request(body), env, noFetch)).status, 400);
  }
  const response = await handleSignup(request(undefined, "https://elsewhere.example"), env, noFetch);
  assert.equal(response.status, 403);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
});

test("enforces rate limits before contacting Craft", async () => {
  const limited = { ...env, SIGNUP_LIMITER: { limit: async () => ({ success: false }) } };
  const response = await handleSignup(request(), limited, noFetch);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "60");
});

test("does not report success when Craft fails or does not confirm a saved item", async (t) => {
  t.mock.method(console, "error", () => {});
  for (const failure of [new Response("denied", { status: 403 }), Response.json({ items: [] })]) {
    let calls = 0;
    const response = await handleSignup(request(), env, async () => ++calls === 1
      ? Response.json({ items: [] }) : failure);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { ok: false });
  }
});

test("preflight and unsupported methods never contact Craft", async () => {
  for (const [method, status] of [["OPTIONS", 204], ["GET", 405]]) {
    const response = await handleSignup(new Request("https://worker.example/signup", {
      method, headers: { Origin: "https://omaredu.com" },
    }), env, noFetch);
    assert.equal(response.status, status);
  }
});
