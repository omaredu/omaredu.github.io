import { useCallback, useEffect, useRef, useState } from "react";
import type { HTMLAttributes } from "react";

import Loader from "./loader";
import { useShortcuts } from "./useShortcuts";

export interface CommandShortcutsProps extends HTMLAttributes<HTMLDivElement> {
  onCommand?: (command: string) => void;
}

export default function CommandShortcuts(props: CommandShortcutsProps) {
  const { onCommand, ...rest } = props;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { shortcuts, loading } = useShortcuts();

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

  useEffect(() => {
    if (loading) {
      return;
    }

    const frame = requestAnimationFrame(() => updateScrollState());
    return () => cancelAnimationFrame(frame);
  }, [loading, shortcuts.length, updateScrollState]);

  return (
    <section {...rest}>
      <div className="mb-4 flex p-4 pb-0">
        <div>
          <p className="font-semibold text-white">Command Shortcuts</p>
          <p className="text-white/70">Quick ways to explore without typing.</p>
        </div>
        <div className="hidden md:flex gap-2 ml-auto px-2 text-white items-center">
          {loading && <Loader size={20} />}
          <button
            type="button"
            className="disabled:opacity-40 disabled:cursor-not-allowed"
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
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto pb-4 no-scrollbar"
      >
        <div className="flex gap-4">
          <div className="w-1 flex-shrink-0 h-[88px]" />
          {loading && shortcuts.length === 0 && (
            <>
              <div
                className="rounded bg-white/10 min-w-[300px] h-[88px] animate-pulse"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="rounded bg-white/10 min-w-[200px] h-[88px] animate-pulse"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="rounded bg-white/10 min-w-[250px] h-[88px] animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
              <div
                className="rounded bg-white/10 min-w-[300px] h-[88px] animate-pulse"
                style={{ animationDelay: "450ms" }}
              />
            </>
          )}
          {shortcuts.map((shortcut) => (
            <button
              key={shortcut.command}
              type="button"
              onClick={() => onCommand?.(shortcut.command)}
              className="group flex flex-col relative justify-end bg-white rounded ring-1 ring-border/10 w-auto min-w-[200px] max-w-[300px] h-[88px] p-4 pr-6 text-left shadow-sm flex-shrink-0 active:scale-[0.98] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22px"
                viewBox="0 -960 960 960"
                width="22px"
                fill="currentColor"
                className="absolute top-3 right-3 text-slate-300 group-hover:text-slate-500 transition"
              >
                <path d="M251.77-254.23 210-296l393.62-394H245.77v-60h460v460h-60v-357.85l-394 393.62Z" />
              </svg>
              <p className="font-medium">{shortcut.title}</p>
              <p className="text-sm text-secondary">{shortcut.description}</p>
            </button>
          ))}
          <div className="w-1 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
