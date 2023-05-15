import { isMobile } from "../../lib/responsive";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

function MainView() {
  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

export default MainView;
