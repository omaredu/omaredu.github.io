import { FormEvent, useRef, useState } from "react";

export default function BetaSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setState("submitting");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const endpoint = import.meta.env.VITE_HALLEY_WAITLIST_URL;
      if (!endpoint) throw new Error("Signup is not configured");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
        signal: controller.signal,
      });
      if (!response.ok || (await response.json()).ok !== true) {
        throw new Error("Signup failed");
      }
      setState("success");
    } catch {
      setState("error");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  }

  return (
    <form onSubmit={submit} className="mt-[40px] w-full" aria-label="Request Halley beta access">
      <div className="relative flex overflow-hidden rounded bg-white p-1 transition-[outline-color] duration-150 ease-out outline outline-2 outline-offset-2 outline-transparent focus-within:outline-foreground/30 [&:has(button:focus)]:outline-foreground after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_rgba(11,19,36,0.1)] after:content-['']">
        <label htmlFor="halley-beta-email" className="sr-only">Email address</label>
        <input
          id="halley-beta-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={254}
          placeholder="Your email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state === "error") setState("idle");
          }}
          disabled={state === "submitting" || state === "success"}
          aria-describedby="halley-beta-status"
          className="min-w-0 flex-1 bg-white px-3 py-2.5 text-sm font-medium text-foreground placeholder:text-foreground/50 focus:outline-none disabled:text-foreground/50"
        />
        <button
          type="submit"
          disabled={state === "submitting" || state === "success"}
          className="shrink-0 rounded-sm bg-foreground px-4 py-2.5 text-sm font-semibold text-white hover:bg-foreground/90 focus:outline-none disabled:cursor-default disabled:opacity-60"
        >
          {state === "submitting" ? "Requesting…" : state === "success" ? "Requested" : "Request access"}
        </button>
      </div>
      <p id="halley-beta-status" role="status" aria-live="polite" className="mt-2 min-h-[36px] text-left md:text-center text-sm text-foreground/70">
        {state === "success"
          ? "You’re on the list. I’ll email you when a spot opens."
          : state === "error"
            ? "Couldn’t save your request. Please try again shortly."
            : "Join the beta waitlist. I’ll email you when a spot opens."}
      </p>
    </form>
  );
}
