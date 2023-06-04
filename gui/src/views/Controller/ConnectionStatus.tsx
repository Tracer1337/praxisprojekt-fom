import { Box, Typography, Divider } from "@mui/material";
import { useRaspi } from "../../lib/raspi";
import useSystemStatus from "./hooks/useSystemStatus";
import SpeedIcon from "@mui/icons-material/Speed";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

function ConnectionStatus() {
  const raspi = useRaspi();

  const systemStatus = useSystemStatus();

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Typography variant="caption" sx={{ display: "block" }}>
          Verbunden mit: {raspi.host}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "error.main",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
          onClick={() => raspi.setHost(null)}
        >
          Verbindung trennen
        </Typography>
      </Box>
      <Divider orientation="vertical" sx={{ mx: 3, height: 46 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& > .MuiBox-root": {
            display: "flex",
            alignItems: "center",
            "& > .MuiSvgIcon-root": {
              mr: 1,
            },
          },
        }}
      >
        <Box>
          <SpeedIcon fontSize="small" />
          <Typography variant="subtitle2">
            {systemStatus.cpu_usage_label}
          </Typography>
        </Box>
        <Box>
          <DeviceThermostatIcon fontSize="small" />
          <Typography
            variant="subtitle2"
            color={
              systemStatus?.cpu_thermal?.high
                ? "warning.light"
                : systemStatus?.cpu_thermal?.critical
                ? "error.main"
                : "initial"
            }
          >
            {systemStatus.cpu_thermal_label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ConnectionStatus;
