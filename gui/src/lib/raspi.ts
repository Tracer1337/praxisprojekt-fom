import {
  createContext,
  createElement,
  useContext,
  PropsWithChildren,
} from "react";
import { useStoredVariable, StorageKeys } from "./persistance";

export const WEBCAM_WIDTH = 640;
export const WEBCAM_HEIGHT = 480;

export type ObjectDetection = {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  class: number;
  name: string;
  confidence: number;
};

export type ControllerState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  cameraUp: boolean;
  cameraDown: boolean;
  cameraLeft: boolean;
  cameraRight: boolean;
  speed: boolean;
  automation: boolean;
};

export type SystemStatus = {
  cpu_usage: number;
  cpu_thermal?: {
    current: number;
    high: boolean;
    critical: boolean;
  };
};

export type WebsocketSendEvent = {
  event: "controller.update";
  data: Partial<ControllerState>;
};

export type WebsocketReceiveEvent =
  | {
      event: "controller.state";
      data: ControllerState;
    }
  | {
      event: "traffic-sign.detections";
      data: ObjectDetection[];
    }
  | {
      event: "system.status";
      data: SystemStatus;
    };

export function getRaspiConfig(host: string) {
  const ssl = window.location.protocol === "https:";
  const http = ssl ? "https" : "http";
  const ws = ssl ? "wss" : "ws";

  const httpUrl = `${http}://${host}:9000`;
  const sunfounderUrl = `${http}://${host}:8000`;
  const websocketUrl = `${ws}://${host}:9001`;

  const healtchCheckUrl = `${httpUrl}/health-check`;
  const videoStreamUrl = `${httpUrl}/video-stream`;

  const getTrafficSignUrl = (objectId: number) =>
    `${httpUrl}/traffic-sign/${objectId}`;

  return {
    sunfounderUrl,
    websocketUrl,
    healtchCheckUrl,
    videoStreamUrl,
    getTrafficSignUrl,
  };
}

const RaspiContext = createContext<{
  host: string | null;
  setHost: (host: string | null) => void;
  config: () => ReturnType<typeof getRaspiConfig>;
} | null>(null);

export function RaspiContextProvider({ children }: PropsWithChildren) {
  const [host, setHost] = useStoredVariable(StorageKeys.RASPI_HOST);

  const config = () => {
    if (!host) {
      throw new Error("Missing host for raspberry-pi");
    }

    return getRaspiConfig(host);
  };

  return createElement(
    RaspiContext.Provider,
    { value: { host, setHost, config } },
    children
  );
}

export function useRaspi() {
  const context = useContext(RaspiContext);

  if (!context) {
    throw new Error("Cannot use context outside provider");
  }

  return context;
}
