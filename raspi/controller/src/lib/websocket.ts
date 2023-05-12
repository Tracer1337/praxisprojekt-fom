import {
  useEffect,
  useState,
  useCallback,
  createContext,
  PropsWithChildren,
  useContext,
  createElement,
} from "react";
import { WebsocketReceiveEvent, WebsocketSendEvent } from "./raspi";

const WebsocketContext = createContext<null | {
  ready: boolean;
  send: (event: WebsocketSendEvent) => void;
  websocket: WebSocket;
}>(null);

export function WebsocketContextProvider({
  url,
  children,
}: PropsWithChildren<{ url: string }>) {
  const [websocket, setWebsocket] = useState<WebSocket>();

  const [ready, setReady] = useState(false);

  const send = useCallback(
    (event: WebsocketSendEvent) => {
      websocket?.send(JSON.stringify(event));
    },
    [websocket]
  );

  useEffect(() => {
    setWebsocket((websocket) => {
      websocket?.close();
      return new WebSocket(url);
    });
  }, [setWebsocket, url]);

  useEffect(() => {
    if (!websocket) {
      return;
    }

    const openHandler = () => setReady(true);

    const closeHandler = () => setReady(false);

    websocket.addEventListener("error", closeHandler);
    websocket.addEventListener("open", openHandler);
    websocket.addEventListener("close", closeHandler);

    return () => {
      websocket.removeEventListener("error", closeHandler);
      websocket.removeEventListener("open", openHandler);
      websocket.removeEventListener("close", closeHandler);
    };
  }, [websocket, setReady]);

  if (!websocket) {
    return null;
  }

  return createElement(
    WebsocketContext.Provider,
    { value: { ready, send, websocket } },
    children
  );
}

export function useWebsocket(
  onMessage: (message: WebsocketReceiveEvent) => void
) {
  const context = useContext(WebsocketContext);

  if (!context) {
    throw new Error("Cannot use context outside provider");
  }

  const { ready, send, websocket } = context;

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      onMessage(JSON.parse(event.data));
    };

    websocket.addEventListener("message", messageHandler);

    return () => {
      websocket.removeEventListener("message", messageHandler);
    };
  }, [onMessage, websocket]);

  return { ready, send };
}
