import { useState, useCallback } from "react";
import { useWebsocket } from "../../../lib/websocket";
import { SystemStatus, WebsocketReceiveEvent } from "../../../lib/raspi";

function useSystemStatus() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);

  const handleMessage = useCallback(
    (message: WebsocketReceiveEvent) => {
      if (message.event === "system.status") {
        setSystemStatus(message.data);
      }
    },
    [setSystemStatus]
  );

  useWebsocket(handleMessage);

  const cpu_usage_label = systemStatus
    ? `${Math.floor(systemStatus.cpu_usage)}%`
    : "-";

  const cpu_thermal_label = systemStatus?.cpu_thermal
    ? `${Math.floor(systemStatus.cpu_thermal.current)}°C`
    : "-";

  return {
    ...systemStatus,
    cpu_usage_label,
    cpu_thermal_label,
  };
}

export default useSystemStatus;
