import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export function XTerm() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const wsUrl = "ws://terminal.omaredu.com/terminal";
    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      fontSize: 14,
      // theme: { background: "#0b0f14" }, // optional
    });

    const fit = new FitAddon();
    term.loadAddon(fit);

    term.open(containerRef.current);
    fit.fit();

    term.writeln("Connecting to terminal...");

    termRef.current = term;
    fitRef.current = fit;

    const decoder = new TextDecoder();
    const socket = new WebSocket(wsUrl);

    const handleOpen = () => {
      term.writeln("Connected.");
      term.write("$ ");
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
      term.writeln("\r\n[disconnected]");
    };
    const handleError = () => {
      term.writeln("\r\n[connection error]");
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

    const onResize = () => fit.fit();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      inputDisposable.dispose();
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
      socket.close();
      term.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-dvw md:w-full h-[350px] overflow-hidden my-5"
    />
  );
}
