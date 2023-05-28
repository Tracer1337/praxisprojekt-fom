import { Tabs, Tab, Box, Paper, Typography, Button } from "@mui/material";
import { Navigate, Outlet, useOutlet } from "react-router-dom";
import useTabs from "./hooks/useTabs";
import RaspiConfigForm from "../../components/RaspiConfigForm";
import { RaspiContextProvider } from "../../lib/raspi";
import { isMobile } from "../../lib/responsive";
import { StorageKeys, useStoredVariable } from "../../lib/persistance";

function ControllerView() {
  const { tab, handleChange } = useTabs(["custom", "sunfounder"]);

  const outlet = useOutlet();

  const [raspiHost, setRaspiHost] = useStoredVariable(StorageKeys.RASPI_HOST);

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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gridTemplateRows: "auto",
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ display: "block" }}>
              Verbunden mit: {raspiHost}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "error.main",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onClick={() => setRaspiHost(null)}
            >
              Verbindung trennen
            </Typography>
          </Box>
          <Tabs value={tab} onChange={handleChange} centered sx={{ mb: 2 }}>
            <Tab label="Custom" />
            <Tab label="SunFounder" />
          </Tabs>
        </Box>
        <Outlet />
      </Box>
    </RaspiContextProvider>
  );
}

export default ControllerView;
