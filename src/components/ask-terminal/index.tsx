import { XTerm } from "./xterm";

export interface AskTerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AskTerminal(props: AskTerminalProps) {
  return (
    <section
      {...props}
      className={`flex bg-black flex-col overflow-hidden items-center outline outline-1 outline-border/10 md:flex-row md:justify-center ${props.className}`}
    >
      <div className="flex flex-col gap-[30px] md:w-[640px] md:max-w-[640px]">
        <XTerm />
      </div>
    </section>
  );
}
