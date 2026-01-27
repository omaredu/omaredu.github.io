import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

import "xterm/css/xterm.css";

import theme from "./themes/xcode-dark.json";

type TerminalStatus = "connecting" | "connected" | "disconnected" | "error";

export const TERMINAL_BACKEND_HOST =
  import.meta.env.VITE_PUBLIC_TERMINAL_HOST || "localhost:8080";

export interface XTermHandle {
  sendCommand: (command: string) => void;
  focus: () => void;
  reconnect: () => void;
}

export interface XTermState {
  status: TerminalStatus;
  connectionVersion: number;
}

export interface XTermProps extends React.HTMLAttributes<HTMLDivElement> {
  onStateChange?: (state: XTermState) => void;
}

export const XTerm = forwardRef<XTermHandle, XTermProps>(
  function XTerm(props, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const termRef = useRef<Terminal | null>(null);
    const fitRef = useRef<FitAddon | null>(null);
    const resizeHandlerRef = useRef<(() => void) | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const statusRef = useRef<TerminalStatus>("connecting");
    const reconnectRequestedRef = useRef(false);
    const pendingInputRef = useRef("");
    const pendingResizeRef = useRef<{ cols: number; rows: number } | null>(
      null,
    );
    const hasConnectedRef = useRef(false);
    const [terminalReady, setTerminalReady] = useState(false);
    const [connectionVersion, setConnectionVersion] = useState(0);
    const [status, setStatus] = useState<TerminalStatus>("connecting");

    useEffect(() => {
      props.onStateChange?.({ status, connectionVersion });
    }, [connectionVersion, props.onStateChange, status]);

    const isTermLive = useCallback((term: Terminal | null) => {
      return Boolean(
        term && term === termRef.current && term.element?.isConnected,
      );
    }, []);

    const writeSystemMessage = useCallback(
      (message: string) => {
        const term = termRef.current;
        if (!isTermLive(term)) return;
        term?.writeln(`[system] ${message}`);
      },
      [isTermLive],
    );

    const sendResizeMessage = useCallback((cols: number, rows: number) => {
      const socket = socketRef.current;
      const payload = JSON.stringify({ type: "resize", cols, rows });

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(payload);
        return;
      }

      pendingResizeRef.current = { cols, rows };
    }, []);

    const handleReconnect = useCallback(() => {
      setConnectionVersion((version) => version + 1);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        sendCommand: (command: string) => {
          const socket = socketRef.current;
          const payload = command.endsWith("\r") ? command : `${command}\r`;

          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(payload);
            termRef.current?.focus();
            return;
          }

          pendingInputRef.current += payload;
          termRef.current?.focus();

          if (statusRef.current === "connecting") {
            return;
          }

          if (!reconnectRequestedRef.current) {
            reconnectRequestedRef.current = true;
            writeSystemMessage("Reconnecting...");
            handleReconnect();
          }
        },
        focus: () => {
          termRef.current?.focus();
        },
        reconnect: () => {
          handleReset();
        },
      }),
      [handleReconnect, writeSystemMessage],
    );

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      if (termRef.current && fitRef.current && isTermLive(termRef.current)) {
        fitRef.current.fit();
        return;
      }

      const term = new Terminal({
        cursorBlink: true,
        convertEol: true,
        fontSize: 14,
        theme,
      });

      const fit = new FitAddon();
      term.loadAddon(fit);
      term.open(container);

      termRef.current = term;
      fitRef.current = fit;
      setTerminalReady(true);

      const onResize = () => {
        if (!isTermLive(term)) return;
        fitRef.current?.fit();
      };

      resizeHandlerRef.current = onResize;
      window.addEventListener("resize", onResize);

      const resizeDisposable = term.onResize(({ cols, rows }) => {
        sendResizeMessage(cols, rows);
      });

      const rafId = requestAnimationFrame(() => {
        if (!isTermLive(term)) return;
        fitRef.current?.fit();
      });

      return () => {
        const shouldDispose =
          !containerRef.current || !containerRef.current.isConnected;
        if (!shouldDispose) return;

        if (resizeHandlerRef.current) {
          window.removeEventListener("resize", resizeHandlerRef.current);
          resizeHandlerRef.current = null;
        }
        cancelAnimationFrame(rafId);
        resizeDisposable.dispose();
        fit.dispose();
        term.dispose();
        termRef.current = null;
        fitRef.current = null;
      };
    }, [isTermLive, sendResizeMessage]);

    useEffect(() => {
      const wsUrl = `${import.meta.env.VITE_PUBLIC_TERMINAL_WS_PROTOCOL}://${TERMINAL_BACKEND_HOST}/terminal`;
      const term = termRef.current;
      if (!terminalReady || !isTermLive(term)) return;

      statusRef.current = "connecting";
      const decoder = new TextDecoder();
      const socket = new WebSocket(wsUrl);

      const handleOpen = () => {
        if (!isTermLive(term)) return;
        statusRef.current = "connected";
        setStatus("connected");

        if (reconnectRequestedRef.current && hasConnectedRef.current) {
          writeSystemMessage("Reconnected.");
          term?.clear();
        }
        reconnectRequestedRef.current = false;
        hasConnectedRef.current = true;
        if (pendingInputRef.current) {
          socket.send(pendingInputRef.current);
          pendingInputRef.current = "";
        }

        if (pendingResizeRef.current) {
          socket.send(
            JSON.stringify({
              type: "resize",
              cols: pendingResizeRef.current.cols,
              rows: pendingResizeRef.current.rows,
            }),
          );
          pendingResizeRef.current = null;
        } else if (term) {
          socket.send(
            JSON.stringify({
              type: "resize",
              cols: term.cols,
              rows: term.rows,
            }),
          );
        }
      };
      const handleMessage = (event: MessageEvent) => {
        if (!isTermLive(term)) return;
        if (typeof event.data === "string") {
          term?.write(event.data);
          return;
        }
        if (event.data instanceof ArrayBuffer) {
          term?.write(decoder.decode(event.data));
          return;
        }
        if (event.data instanceof Blob) {
          void event.data.arrayBuffer().then((buffer) => {
            term?.write(decoder.decode(buffer));
          });
        }
      };
      const handleClose = (event: CloseEvent) => {
        if (!isTermLive(term)) return;
        statusRef.current = "disconnected";
        setStatus("disconnected");
        reconnectRequestedRef.current = false;
        const reason = event.reason?.trim() || "No reason provided";
        writeSystemMessage(
          `Disconnected (code ${event.code}, clean=${event.wasClean}): ${reason}`,
        );
      };
      const handleError = () => {
        if (!isTermLive(term)) return;
        statusRef.current = "error";
        setStatus("error");
        reconnectRequestedRef.current = false;
        term?.writeln("");
        writeSystemMessage("Connection error. Type to reconnect.");
      };

      socket.addEventListener("open", handleOpen);
      socket.addEventListener("message", handleMessage);
      socket.addEventListener("close", handleClose);
      socket.addEventListener("error", handleError);
      socketRef.current = socket;

      const inputDisposable = term?.onData((data) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(data);
          return;
        }

        pendingInputRef.current += data;

        if (statusRef.current === "connecting") {
          return;
        }

        if (!reconnectRequestedRef.current) {
          reconnectRequestedRef.current = true;
          writeSystemMessage("Reconnecting...");
          handleReconnect();
        }
      });

      return () => {
        inputDisposable?.dispose();
        socket.removeEventListener("open", handleOpen);
        socket.removeEventListener("message", handleMessage);
        socket.removeEventListener("close", handleClose);
        socket.removeEventListener("error", handleError);
        socket.close();
        socketRef.current = null;
      };
    }, [
      connectionVersion,
      terminalReady,
      handleReconnect,
      writeSystemMessage,
      isTermLive,
    ]);

    const handleReset = useCallback(() => {
      termRef.current?.reset();
      handleReconnect();
    }, [handleReconnect]);

    return (
      <div
        {...props}
        className={`relative h-[400px] overflow-hidden m-5 ${props.className || ""}`}
      >
        <button
          onClick={handleReset}
          className="hidden md:flex absolute right-0 top-0 z-10 items-center text-foreground bg-white pl-2 p-1 gap-1 rounded-sm font-semibold text-sm active:scale-[0.97] hover:text-foreground/60 transition"
        >
          <span>
            {status === "disconnected" || status === "error"
              ? "Reconnect"
              : "Reset session"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            width="20px"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M440-142.77q-112.54-14.62-186.27-99.15Q180-326.46 180-440q0-61 24.08-116.88 24.08-55.89 67.46-98.2l42.77 42.77q-36.85 33.62-55.58 78.04Q240-489.85 240-440q0 88 56.19 155.12 56.19 67.11 143.81 82.11v60Zm80 .77v-60q86.62-17.54 143.31-83.96Q720-352.38 720-440q0-100-70-170t-170-70h-14.15l54 54-42.16 42.15L351.54-710l126.15-126.15L519.85-794l-54 54H480q125.54 0 212.77 87.23T780-440q0 112.92-73.92 197.08Q632.15-158.77 520-142Z" />
          </svg>
        </button>
        <div ref={containerRef} className="h-full w-full" />
      </div>
    );
  },
);
