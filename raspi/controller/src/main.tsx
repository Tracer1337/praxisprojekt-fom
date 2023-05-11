import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { WebsocketContextProvider } from "./lib/websocket.tsx";
import { websocketUrl } from "./lib/raspi.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WebsocketContextProvider url={websocketUrl}>
      <App />
    </WebsocketContextProvider>
  </React.StrictMode>
);
