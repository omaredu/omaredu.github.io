import { XTerm } from "./xterm";

import theme from "./themes/ayu-dark.json";

export interface AskTerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AskTerminal(props: AskTerminalProps) {
  return (
    <section
      {...props}
      style={{ backgroundColor: theme.background }}
      className={`overflow-hidden border border-border/10 rounded shadow-sm ${props.className}`}
    >
      <XTerm />
    </section>
  );
}
