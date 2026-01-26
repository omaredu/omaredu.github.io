import { useEffect, useState } from "react";
import { TERMINAL_BACKEND_HOST } from "./xterm";

const MAX_TIMEOUT_MS = 10_000;

export function useTerminalServiceHealth() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ healthy: boolean }>({
    healthy: false,
  });

  const fetchStatus = async (): Promise<{ healthy: boolean }> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), MAX_TIMEOUT_MS);

    try {
      setLoading(true);

      const response = await fetch(`http://${TERMINAL_BACKEND_HOST}/health`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
      }

      const data = await response.text();
      return { healthy: data === "OK" };
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.warn("Health check timed out");
      } else {
        console.error("Failed to fetch health status:", error);
      }
      return { healthy: false };
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadStatus = async () => {
      const fetchedStatus = await fetchStatus();
      if (mounted) setStatus(fetchedStatus);
    };

    loadStatus();

    return () => {
      mounted = false;
    };
  }, []);

  return { loading, status };
}
