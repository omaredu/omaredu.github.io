export type TerminalStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

const STATUS_STYLES: Record<
  TerminalStatus,
  { label: string; dot: string; text: string; ring: string; badge: string }
> = {
  connecting: {
    label: "Connecting",
    dot: "bg-amber-400",
    text: "text-amber-100",
    ring: "ring-amber-400/40",
    badge: "bg-amber-400/10",
  },
  connected: {
    label: "Live",
    dot: "bg-red-500",
    text: "text-red-100",
    ring: "ring-red-500/50",
    badge: "bg-red-500/10",
  },
  disconnected: {
    label: "Offline",
    dot: "bg-neutral-400",
    text: "text-neutral-200",
    ring: "ring-neutral-400/30",
    badge: "bg-neutral-400/10",
  },
  error: {
    label: "Error",
    dot: "bg-rose-500",
    text: "text-rose-100",
    ring: "ring-rose-500/50",
    badge: "bg-rose-500/10",
  },
};

export function TerminalStatusIndicator({ status }: { status: TerminalStatus }) {
  const styles = STATUS_STYLES[status];

  return (
    <div className="pointer-events-none absolute right-3 top-3 z-10">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ring-1 ring-inset backdrop-blur ${styles.badge} ${styles.text} ${styles.ring}`}
        aria-live="polite"
      >
        <span
          className={`h-2 w-2 rounded-full ${styles.dot} ${
            status === "connected" ? "animate-pulse" : ""
          }`}
          aria-hidden="true"
        />
        {styles.label}
      </span>
    </div>
  );
}
