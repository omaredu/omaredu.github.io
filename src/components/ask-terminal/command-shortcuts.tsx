import { useCallback, useEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";

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

export interface CommandShortcutsProps extends HTMLAttributes<HTMLDivElement> {
  onCommand?: (command: string) => void;
}

export default function CommandShortcuts(props: CommandShortcutsProps) {
  const { onCommand, ...rest } = props;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft < maxScrollLeft - 1);
  }, []);

  const handlePaginatedScroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const scrollAmount = container.clientWidth;
    const nextScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    updateScrollState();

    const handleScroll = () => updateScrollState();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [updateScrollState]);

  return (
    <section {...rest}>
      <div className="mb-4 flex p-4 pb-0">
        <div>
          <p className="font-semibold text-white">Command Shortcuts</p>
          <p className="text-white/70">Quick ways to explore without typing.</p>
        </div>
        <div className="hidden md:flex gap-2 ml-auto px-2">
          <button
            type="button"
            className="text-white disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => handlePaginatedScroll("left")}
            aria-label="Scroll shortcuts left"
            disabled={!canScrollLeft}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="text-white disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => handlePaginatedScroll("right")}
            aria-label="Scroll shortcuts right"
            disabled={!canScrollRight}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      <div ref={scrollContainerRef} className="overflow-x-auto pb-4">
        <div className="flex gap-4">
          <div className="w-1 flex-shrink-0" />
          {commandShortcuts.map((shortcut) => (
            <button
              key={shortcut.command}
              type="button"
              onClick={() => onCommand?.(shortcut.command)}
              className="flex flex-col bg-white rounded ring-1 ring-border/10 w-auto min-w-[200px] max-w-[250px] h-[88px] p-4 text-left shadow-sm flex-shrink-0"
            >
              <p className="font-medium">{shortcut.title}</p>
              <p className="mt-1 text-sm text-secondary">
                {shortcut.description}
              </p>
            </button>
          ))}
          <div className="w-1 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
