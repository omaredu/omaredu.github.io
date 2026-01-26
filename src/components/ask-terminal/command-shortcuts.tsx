const commandShortcuts = [
  {
    command: "help [command]",
    title: "Need a hint?",
    description: "Shows simple guidance for any command you want to use.",
  },
  {
    command: "ask [question]",
    title: "Ask about Omar",
    description: "Get answers about my work, projects, and case studies.",
  },
  {
    command: "pwd",
    title: "Where am I?",
    description: "Tells you the folder you are currently in.",
  },
  {
    command: "ls [path]",
    title: "Show what's here",
    description: "Lists files and folders in a place you choose.",
  },
  {
    command: "cd [path]",
    title: "Go to a folder",
    description: "Moves you into another folder so you can explore.",
  },
  {
    command: "cat <file>",
    title: "Open a file",
    description: "Displays the contents of a file on screen.",
  },
  {
    command: "echo <text>",
    title: "Say something",
    description: "Prints any text you type back to you.",
  },
  {
    command: "whoami",
    title: "Who am I?",
    description: "Shows the name of the current user.",
  },
  {
    command: "date",
    title: "What time is it?",
    description: "Shows the server's current date and time.",
  },
  {
    command: "clear",
    title: "Clean the screen",
    description: "Clears the terminal so it's easier to read.",
  },
  {
    command: "projects",
    title: "Show my projects",
    description: "Lists all projects in the projects folder.",
  },
];

export interface CommandShortcutsProps extends React.HTMLAttributes<HTMLDivElement> {
  onCommand?: (command: string) => void;
}

export default function CommandShortcuts(props: CommandShortcutsProps) {
  const { onCommand, ...rest } = props;

  return (
    <section {...rest}>
      <div className="mb-4">
        <p className="font-semibold">Command Shortcuts</p>
        <p className="text-secondary">
          Click a shortcut to run the command in the terminal.
        </p>
      </div>
      <div {...rest} className="flex gap-4">
        {commandShortcuts.map((shortcut) => (
          <button
            key={shortcut.command}
            type="button"
            onClick={() => onCommand?.(shortcut.command)}
            className="flex flex-col rounded border border-border/10 w-auto min-w-[200px] max-w-[250px] h-[88px] p-4 text-left shadow-sm flex-shrink-0"
          >
            <p className="font-medium">{shortcut.title}</p>
            <p className="mt-1 text-sm text-secondary">
              {shortcut.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
