import { useRef } from "react";

import { useTerminalServiceHealth } from "./useTerminalServiceHealth";
import CommandShortcuts from "./command-shortcuts";
import { XTerm, XTermHandle } from "./xterm";
import Loader from "./loader";

import theme from "./themes/ayu-dark.json";

export interface AskTerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AskTerminal(props: AskTerminalProps) {
  const { status, loading } = useTerminalServiceHealth();
  const terminalRef = useRef<XTermHandle | null>(null);

  return (
    <section
      {...props}
      style={{ backgroundColor: theme.background }}
      className={`relative flex flex-col overflow-hidden ring-1 ring-border/10 rounded shadow-sm ${props.className}`}
    >
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col gap-3 items-center justify-center bg-black/50 text-white/70">
          <Loader />
          <span className="text-sm">Checking terminal service</span>
        </div>
      )}
      {!status.healthy && !loading && (
        <div className="absolute inset-0 z-20 flex flex-col gap-3 items-center justify-center bg-black/50 text-white/70">
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
          <div className="flex flex-col items-center gap-1 max-w-[250px] text-center">
            <span className="text-white">Terminal temporarily unavailable</span>
            <span className="text-sm">
              The backend stepped away for a moment. I’m bringing it back
              shortly.
            </span>
          </div>
        </div>
      )}

      <div
        className={`transition duration-500 ${status.healthy && !loading ? "opacity-100" : "opacity-0"}`}
      >
        <XTerm ref={terminalRef} />
      </div>
      <CommandShortcuts
        className={`transition duration-500 border-t border-white/20 ${status.healthy && !loading ? "opacity-100" : "opacity-0"}`}
        onCommand={(command) => {
          terminalRef.current?.sendCommand("\x03");
          terminalRef.current?.sendCommand("clear");
          terminalRef.current?.sendCommand(command);
        }}
      />
    </section>
  );
}
