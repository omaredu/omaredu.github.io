import { useRef } from "react";

import CommandShortcuts from "./command-shortcuts";
import { XTerm, XTermHandle } from "./xterm";

import theme from "./themes/ayu-dark.json";

export interface AskTerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AskTerminal(props: AskTerminalProps) {
  const terminalRef = useRef<XTermHandle | null>(null);

  return (
    <section
      {...props}
      style={{ backgroundColor: theme.background }}
      className={`flex flex-col overflow-hidden ring-1 ring-border/10 rounded shadow-sm ${props.className}`}
    >
      <div>
        <XTerm ref={terminalRef} />
      </div>
      <CommandShortcuts
        className="p-4 border-t border-t-white/20"
        onCommand={(command) => {
          terminalRef.current?.sendCommand(command);
        }}
      />
    </section>
  );
}
