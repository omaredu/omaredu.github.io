import { useEffect, useRef, useState } from "react";

import { useTerminalServiceHealth } from "./useTerminalServiceHealth";
import CommandShortcuts from "./command-shortcuts";
import { XTerm, XTermHandle, XTermState } from "./xterm";
import Loader from "./loader";
import { useIsMobile } from "../../hooks/useIsMobile";

import theme from "./themes/xcode-dark.json";

export interface AskTerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

type OverlayAction = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

type OverlayConfig = {
  id:
    | "loading"
    | "initializing"
    | "connecting"
    | "error"
    | "unhealthy"
    | "welcome"
    | "reconnect";
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: OverlayAction;
};

const ICONS = {
  serviceUnavailable: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12v4" />
      <path d="M12 20h.01" />
      <path d="M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708" />
    </svg>
  ),
  welcome: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19h8" />
      <path d="m4 17 6-6-6-6" />
    </svg>
  ),
  reconnect: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  ),
  start: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M340-302.23v-355.54q0-15.84 10.85-26 10.84-10.15 25.31-10.15 4.61 0 9.53 1.31 4.93 1.3 9.54 3.92l279.84 178.15q8.24 5.62 12.35 13.46 4.12 7.85 4.12 17.08 0 9.23-4.12 17.08-4.11 7.84-12.35 13.46L395.23-271.31q-4.61 2.62-9.54 3.92-4.92 1.31-9.53 1.31-14.47 0-25.31-10.15-10.85-10.16-10.85-26ZM400-480Zm0 134 210.77-134L400-614v268Z" />
    </svg>
  ),
  refresh: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      width="20px"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M440-142.77q-112.54-14.62-186.27-99.15Q180-326.46 180-440q0-61 24.08-116.88 24.08-55.89 67.46-98.2l42.77 42.77q-36.85 33.62-55.58 78.04Q240-489.85 240-440q0 88 56.19 155.12 56.19 67.11 143.81 82.11v60Zm80 .77v-60q86.62-17.54 143.31-83.96Q720-352.38 720-440q0-100-70-170t-170-70h-14.15l54 54-42.16 42.15L351.54-710l126.15-126.15L519.85-794l-54 54H480q125.54 0 212.77 87.23T780-440q0 112.92-73.92 197.08Q632.15-158.77 520-142Z" />
    </svg>
  ),
};

const OVERLAY_BASE_CLASS =
  "absolute inset-0 z-20 flex flex-col gap-3 items-center justify-center text-white/70";

const LOADER_OVERLAY_IDS: OverlayConfig["id"][] = [
  "loading",
  "initializing",
  "connecting",
];

function getOverlay({
  loading,
  healthy,
  terminalState,
  onReconnect,
  onStart,
  hasConnected,
  startRequested,
}: {
  loading: boolean;
  healthy: boolean;
  terminalState: XTermState | null;
  onReconnect: () => void;
  onStart: () => void;
  hasConnected: boolean;
  startRequested: boolean;
}): OverlayConfig | null {
  if (loading) {
    return {
      id: "loading",
      title: "Checking terminal service",
    };
  }

  if (!healthy) {
    return {
      id: "unhealthy",
      icon: ICONS.serviceUnavailable,
      title: "Terminal temporarily unavailable",
      description:
        "The backend stepped away for a moment. I’m bringing it back shortly.",
    };
  }

  if (!terminalState) {
    return {
      id: "initializing",
      title: "Initializing terminal",
    };
  }

  if (terminalState.status === "connected") {
    return null;
  }

  if (terminalState.status === "error") {
    return {
      id: "error",
      icon: ICONS.serviceUnavailable,
      title: "Terminal hit a snag",
      description: "Something went wrong while connecting. Try again?",
      action: {
        label: "Retry",
        onClick: onReconnect,
        icon: ICONS.refresh,
      },
    };
  }

  if (!hasConnected) {
    return {
      id: "welcome",
      icon: ICONS.welcome,
      title: "Welcome to the Ask Terminal!",
      description:
        "Explore the terminal by running commands. To get started, press the button below.",
      action: {
        label: "Start Terminal",
        onClick: onStart,
        icon: ICONS.start,
        loading: startRequested,
        disabled: startRequested,
      },
    };
  }

  return {
    id: "reconnect",
    icon: ICONS.reconnect,
    title: "Oops! Connection lost.",
    description: "Don't worry, you can reconnect to the terminal supafast.",
    action: {
      label: "Reconnect",
      onClick: onReconnect,
      icon: ICONS.refresh,
    },
  };
}

export default function AskTerminal(props: AskTerminalProps) {
  const { status, loading } = useTerminalServiceHealth();
  const terminalRef = useRef<XTermHandle | null>(null);
  const [terminalState, setTerminalState] = useState<XTermState | null>(null);
  const [hasConnected, setHasConnected] = useState(false);
  const [startRequested, setStartRequested] = useState(false);
  const isMobile = useIsMobile();
  const lastAutoAskVersionRef = useRef<number | null>(null);
  useEffect(() => {
    if (terminalState?.status === "connected") {
      setHasConnected(true);
      setStartRequested(false);
    } else if (terminalState?.status === "error") {
      setStartRequested(false);
    }
  }, [terminalState?.status]);
  useEffect(() => {
    if (!isMobile) return;
    if (terminalState?.status !== "connected") return;
    if (terminalState.connectionVersion === lastAutoAskVersionRef.current) {
      return;
    }

    lastAutoAskVersionRef.current = terminalState.connectionVersion;
    terminalRef.current?.sendCommand("ask");
  }, [isMobile, terminalState?.connectionVersion, terminalState?.status]);
  const isConnected =
    status.healthy && !loading && terminalState?.status === "connected";
  const handleStart = () => {
    if (startRequested) return;
    setStartRequested(true);
    terminalRef.current?.reconnect?.();
  };
  const overlay = getOverlay({
    loading,
    healthy: status.healthy,
    terminalState,
    onReconnect: () => terminalRef.current?.reconnect?.(),
    onStart: handleStart,
    hasConnected,
    startRequested,
  });

  return (
    <section
      {...props}
      style={{ backgroundColor: theme.background }}
      className={`relative flex flex-col-reverse md:flex-col overflow-hidden md:rounded terminal-container ${props.className}`}
    >
      {overlay && LOADER_OVERLAY_IDS.includes(overlay.id) && (
        <div className={OVERLAY_BASE_CLASS}>
          <Loader />
          <span className="text-sm">{overlay.title}</span>
        </div>
      )}
      {overlay && overlay.id !== "loading" && (
        <div className={OVERLAY_BASE_CLASS}>
          {overlay.icon}
          <div className="flex flex-col items-center gap-1 max-w-[250px] text-center">
            <span className="text-white">{overlay.title}</span>
            {overlay.description && (
              <span className="text-sm">{overlay.description}</span>
            )}
          </div>
          {overlay.action?.loading ? (
            <Loader />
          ) : (
            overlay.action && (
              <button
                onClick={overlay.action.onClick}
                disabled={overlay.action.disabled}
                aria-busy={overlay.action.loading}
                className="flex mt-2 items-center text-foreground bg-white pl-3 p-1 gap-1 rounded-sm font-semibold text-sm active:scale-[0.97] hover:text-foreground/60 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{overlay.action.label}</span>
                {overlay.action.icon}
              </button>
            )
          )}
        </div>
      )}

      <div
        className={`transition duration-500 ${isConnected ? "opacity-100" : "opacity-0"}`}
      >
        <XTerm onStateChange={setTerminalState} ref={terminalRef} />
      </div>
      <CommandShortcuts
        className={`transition duration-500 border-b md:border-t border-white/20 ${isConnected ? "opacity-100" : "opacity-0"}`}
        onCommand={(command) => {
          terminalRef.current?.sendCommand("\x03");
          terminalRef.current?.sendCommand("clear");
          terminalRef.current?.sendCommand(command);
        }}
      />
    </section>
  );
}
