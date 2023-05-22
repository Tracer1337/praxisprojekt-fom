import {
  createContext,
  createElement,
  useContext,
  PropsWithChildren,
} from "react";

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
    };

export function getRaspiConfig(host: string) {
  const httpUrl = `http://${host}:9000`;
  const websocketUrl = `ws://${host}:9001`;

  const healtchCheckUrl = `${httpUrl}/health-check`;
  const videoStreamUrl = `${httpUrl}/video-stream`;

  const getTrafficSignUrl = (objectId: number) =>
    `${httpUrl}/traffic-sign/${objectId}`;

  return {
    websocketUrl,
    healtchCheckUrl,
    videoStreamUrl,
    getTrafficSignUrl,
  };
}

const RaspiContext = createContext<{ host: string } | null>(null);

export function RaspiContextProvider({
  host,
  children,
}: PropsWithChildren<{ host: string }>) {
  if (!host) {
    return null;
  }

  return createElement(RaspiContext.Provider, { value: { host } }, children);
}

export function useRaspiConfig() {
  const context = useContext(RaspiContext);

  if (!context) {
    throw new Error("Cannot use context outside provider");
  }

  return getRaspiConfig(context.host);
}
