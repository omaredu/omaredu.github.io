import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import {
  TerminalStatusIndicator,
  type TerminalStatus,
} from "./terminal-status-indicator";

import theme from "./themes/ayu-dark.json";

export function XTerm() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const [status, setStatus] = useState<TerminalStatus>("connecting");
  const [terminalReady, setTerminalReady] = useState(false);
  const [connectionVersion, setConnectionVersion] = useState(0);

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
    const wsUrl = "ws://terminal.omaredu.com/terminal";
    const term = termRef.current;
    if (!term || !terminalReady) return;

    setStatus("connecting");
    const decoder = new TextDecoder();
    const socket = new WebSocket(wsUrl);

    const handleOpen = () => {
      setStatus("connected");
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
    const handleClose = () => {
      setStatus("disconnected");
    };
    const handleError = () => {
      setStatus("error");
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);

    const inputDisposable = term.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    });

    return () => {
      inputDisposable.dispose();
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
      socket.close();
    };
  }, [connectionVersion, terminalReady]);

  const handleReconnect = () => {
    setConnectionVersion((version) => version + 1);
  };

  return (
    <div className="relative h-[400px] overflow-hidden m-5">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
