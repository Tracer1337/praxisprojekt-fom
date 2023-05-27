import { Tabs, Tab, Box, Paper, Typography } from "@mui/material";
import { Navigate, Outlet, useOutlet } from "react-router-dom";
import { useState } from "react";
import useTabs from "./hooks/useTabs";
import RaspiConfigForm from "../../components/RaspiConfigForm";
import { RaspiContextProvider } from "../../lib/raspi";
import { isMobile } from "../../lib/responsive";

function ControllerView() {
  const { tab, handleChange } = useTabs(["custom", "sunfounder"]);

  const outlet = useOutlet();

  const [raspiHost, setRaspiHost] = useState<string>();

  if (!outlet) {
    return <Navigate to="/controller/custom" replace={true} />;
  }

  if (!raspiHost) {
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
          <RaspiConfigForm onSubmit={(data) => setRaspiHost(data.host)} />
        </Paper>
      </Box>
    );
  }

  if (isMobile) {
    return (
      <RaspiContextProvider host={raspiHost}>
        <Outlet />
      </RaspiContextProvider>
    );
  }

  return (
    <RaspiContextProvider host={raspiHost}>
      <Box>
        <Tabs value={tab} onChange={handleChange} centered sx={{ mb: 2 }}>
          <Tab label="Custom" />
          <Tab label="SunFounder" />
        </Tabs>
        <Outlet />
      </Box>
    </RaspiContextProvider>
  );
}

export default ControllerView;
