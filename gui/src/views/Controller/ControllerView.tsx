import { Box, Paper, Typography } from "@mui/material";
import { Navigate, Outlet, useOutlet } from "react-router-dom";
import useTabs from "./hooks/useTabs";
import RaspiConfigForm from "../../components/RaspiConfigForm";
import { useRaspi } from "../../lib/raspi";
import { isMobile } from "../../lib/responsive";
import ConnectionStatus from "./ConnectionStatus";
import { WebsocketContextProvider } from "../../lib/websocket";
import ControllerTabs from "./ControllerTabs";

function ControllerView() {
  const { tab, handleChange } = useTabs(["custom", "sunfounder"]);

  const outlet = useOutlet();

  const raspi = useRaspi();

  if (!outlet) {
    return <Navigate to="/controller/custom" replace={true} />;
  }

  if (!raspi.host) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...(isMobile ? { height: "100vh" } : { mt: 2 }),
        }}
      >
        <Paper variant="outlined" sx={{ width: 500, p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Raspberry-Pi Controller
          </Typography>
          <RaspiConfigForm onSubmit={(data) => raspi.setHost(data.host)} />
        </Paper>
      </Box>
    );
  }

  if (isMobile) {
    return <Outlet />;
  }

  return (
    <WebsocketContextProvider url={raspi.config().websocketUrl}>
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gridTemplateRows: "auto",
          }}
        >
          <ConnectionStatus />
          <ControllerTabs tab={tab} onChange={handleChange} />
        </Box>
        <Outlet />
      </Box>
    </WebsocketContextProvider>
  );
}

export default ControllerView;
