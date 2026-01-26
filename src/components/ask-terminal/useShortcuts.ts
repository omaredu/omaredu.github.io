import { useEffect, useState } from "react";

import { TERMINAL_BACKEND_HOST } from "./xterm";

type Shortcut = {
  command: string;
  title: string;
  description: string;
};

export function useShortcuts() {
  const [loading, setLoading] = useState(false);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const fetchShortcuts = async (): Promise<Shortcut[]> => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulated delay
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_TERMINAL_PROTOCOL}://${TERMINAL_BACKEND_HOST}/shortcuts`,
      );
      if (!response.ok) {
        throw new Error(`Error fetching shortcuts: ${response.statusText}`);
      }
      const data = await response.json();
      return data as Shortcut[];
    } catch (error) {
      console.error("Failed to fetch shortcuts:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadShortcuts = async () => {
      const fetchedShortcuts = await fetchShortcuts();
      setShortcuts(fetchedShortcuts);
    };

    loadShortcuts();
  }, []);

  return { loading, shortcuts };
}
