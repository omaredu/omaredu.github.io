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

import theme from "./themes/ayu-dark.json";

type TerminalStatus = "connecting" | "connected" | "disconnected" | "error";

export interface XTermHandle {
  sendCommand: (command: string) => void;
  focus: () => void;
}

export interface XTermProps extends React.HTMLAttributes<HTMLDivElement> {}

export const XTerm = forwardRef<XTermHandle, XTermProps>(function XTerm(
  props,
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const statusRef = useRef<TerminalStatus>("connecting");
  const reconnectRequestedRef = useRef(false);
  const pendingInputRef = useRef("");
  const hasConnectedRef = useRef(false);
  const [terminalReady, setTerminalReady] = useState(false);
  const [connectionVersion, setConnectionVersion] = useState(0);

  const writeSystemMessage = useCallback((message: string) => {
    termRef.current?.writeln(`[system] ${message}`);
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
    }),
    [handleReconnect, writeSystemMessage],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      fontSize: 14,
      theme,
    });

    const fit = new FitAddon();
    term.loadAddon(fit);

    term.open(containerRef.current);
    fit.fit();

    termRef.current = term;
    fitRef.current = fit;
    setTerminalReady(true);

    const onResize = () => fit.fit();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      term.dispose();
      setTerminalReady(false);
    };
  }, []);

  useEffect(() => {
    const wsUrl = "wss://terminal.omaredu.com/terminal";
    const term = termRef.current;
    if (!term || !terminalReady) return;

    statusRef.current = "connecting";
    const decoder = new TextDecoder();
    const socket = new WebSocket(wsUrl);

    const handleOpen = () => {
      statusRef.current = "connected";

      if (reconnectRequestedRef.current && hasConnectedRef.current) {
        writeSystemMessage("Reconnected.");
        term.clear();
      }
      reconnectRequestedRef.current = false;
      hasConnectedRef.current = true;
      if (pendingInputRef.current) {
        socket.send(pendingInputRef.current);
        pendingInputRef.current = "";
      }
    };
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data === "string") {
        term.write(event.data);
        return;
      }
      if (event.data instanceof ArrayBuffer) {
        term.write(decoder.decode(event.data));
        return;
      }
      if (event.data instanceof Blob) {
        void event.data.arrayBuffer().then((buffer) => {
          term.write(decoder.decode(buffer));
        });
      }
    };
    const handleClose = (event: CloseEvent) => {
      statusRef.current = "disconnected";
      reconnectRequestedRef.current = false;
      const reason = event.reason?.trim() || "No reason provided";
      writeSystemMessage(
        `Disconnected (code ${event.code}, clean=${event.wasClean}): ${reason}`,
      );
    };
    const handleError = () => {
      statusRef.current = "error";
      reconnectRequestedRef.current = false;
      term.writeln("");
      writeSystemMessage("Connection error. Type to reconnect.");
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);
    socketRef.current = socket;

    const inputDisposable = term.onData((data) => {
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
      inputDisposable.dispose();
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
      socket.close();
      socketRef.current = null;
    };
  }, [connectionVersion, terminalReady, handleReconnect, writeSystemMessage]);

  return (
    <div
      {...props}
      className={`relative h-[400px] overflow-hidden m-5 ${props.className || ""}`}
    >
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
});
