const RASPI_HOSTNAME = import.meta.env.DEV
  ? "localhost"
  : window.location.hostname;

const RASPI_HTTP_HOST = `${RASPI_HOSTNAME}:9000`;
const RASPI_WS_HOST = `${RASPI_HOSTNAME}:9001`;

export const videoStreamUrl = `http://${RASPI_HTTP_HOST}/video-stream`;

export const websocketUrl = `ws://${RASPI_WS_HOST}`;

export const getTrafficSignUrl = (objectId: number) =>
  `http://${RASPI_HTTP_HOST}/traffic-sign/${objectId}`;

export type ObjectDetection = {
  x: number;
  y: number;
  width: number;
  height: number;
  class: number;
  name: string;
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
