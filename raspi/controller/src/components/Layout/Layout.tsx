import { Outlet } from "react-router-dom";
import Header from "../Header";
import { isMobile } from "../../lib/responsive";

function Layout() {
  if (isMobile) {
    return <Outlet />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
