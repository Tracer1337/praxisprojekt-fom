import { Box, Typography, Divider } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useRaspi } from "../../lib/raspi";
import useSystemStatus from "./hooks/useSystemStatus";
import useControllerState from "../../components/Controller/hooks/useControllerState";

function ConnectionStatus() {
  const raspi = useRaspi();

  const controller = useControllerState();

  const systemStatus = useSystemStatus();

  const divider = <Divider orientation="vertical" sx={{ mx: 3, height: 46 }} />;

  const availability = (status: boolean | null) =>
    status === null ? (
      <HorizontalRuleIcon fontSize="small" />
    ) : status ? (
      <CheckIcon fontSize="small" />
    ) : (
      <CloseIcon fontSize="small" />
    );

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
      {divider}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 60,
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
      {divider}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 170,
          "& > .MuiBox-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& > .MuiSvgIcon-root": {
              ml: 1,
            },
          },
        }}
      >
        <Box>
          <Typography variant="subtitle2">SunFounder:</Typography>
          {availability(controller.state?.sunfounderAvailable ?? null)}
        </Box>
        <Box>
          <Typography variant="subtitle2">Road Sign Detection:</Typography>
          {availability(controller.state?.roadSignDetectionAvailable ?? null)}
        </Box>
      </Box>
    </Box>
  );
}

export default ConnectionStatus;
