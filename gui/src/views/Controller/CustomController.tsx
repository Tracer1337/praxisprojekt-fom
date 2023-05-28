import { isMobile } from "../../lib/responsive";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import { useRaspi } from "../../lib/raspi";
import { WebsocketContextProvider } from "../../lib/websocket";

function CustomController() {
  const raspi = useRaspi().config();

  return (
    <WebsocketContextProvider url={raspi.websocketUrl}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </WebsocketContextProvider>
  );
}

export default CustomController;
