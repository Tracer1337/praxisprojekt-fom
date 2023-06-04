import { isMobile } from "../../lib/responsive";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

function CustomController() {
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

export default CustomController;
