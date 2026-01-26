import { useRef } from "react";

import CommandShortcuts from "./command-shortcuts";
import { XTerm, XTermHandle } from "./xterm";

import theme from "./themes/ayu-dark.json";

export interface AskTerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AskTerminal(props: AskTerminalProps) {
  const terminalRef = useRef<XTermHandle | null>(null);

  return (
    <section>
      <div
        {...props}
        style={{ backgroundColor: theme.background }}
        className={`overflow-hidden border border-border/10 rounded shadow-sm ${props.className}`}
      >
        <XTerm ref={terminalRef} />
      </div>
      <CommandShortcuts
        className="mt-4"
        onCommand={(command) => {
          terminalRef.current?.sendCommand(command);
        }}
      />
    </section>
  );
}
