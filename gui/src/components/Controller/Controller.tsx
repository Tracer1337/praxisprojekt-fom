import { CircularProgress, Stack, ToggleButton, Box } from "@mui/material";
import useControllerState from "./hooks/useControllerState";
import Joystick from "./Joystick";
import MemoryIcon from "@mui/icons-material/Memory";
import SpeedIcon from "@mui/icons-material/Speed";
import ReplayIcon from "@mui/icons-material/Replay";
import { isMobile } from "../../lib/responsive";
import useKeyboardControls from "./hooks/useKeyboardControls";
import useControllerUpdate from "./hooks/useControllerUpdate";
import useControllerReset from "./hooks/useControllerReset";

function Controller() {
  const update = useControllerUpdate();

  const reset = useControllerReset();

  const { state, handleMove, handleCamera, setAutomation, setSpeed } =
    useControllerState({ update });

  useKeyboardControls({ state, update });

  if (!state) {
    return <CircularProgress />;
  }

  const automationProps = {
    value: "automation",
    selected: state.automation,
    onChange: () => setAutomation(!state.automation),
  };

  const speedProps = {
    value: "speed",
    selected: state.speed,
    onChange: () => setSpeed(!state.speed),
  };

  if (isMobile) {
    return (
      <Stack
        direction="row"
        spacing={3}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-end",
          "& .MuiToggleButton-root, & .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "white !important",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Joystick size={130} throttle={100} onChange={handleMove} />
          <ToggleButton {...automationProps} sx={{ ml: 4 }}>
            <MemoryIcon />
          </ToggleButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <ToggleButton {...speedProps} sx={{ mr: 4 }}>
            <SpeedIcon />
          </ToggleButton>
          <Joystick size={130} throttle={100} onChange={handleCamera} />
        </Box>
      </Stack>
    );
  }

  return (
    <Stack
      direction="row"
      sx={{
        "& .MuiToggleButton-root, & .MuiToggleButton-root.Mui-selected": {
          backgroundColor: "white !important",
        },
      }}
    >
      <ToggleButton {...automationProps} sx={{ mr: 4 }}>
        <MemoryIcon />
      </ToggleButton>
      <ToggleButton {...speedProps} sx={{ mr: 4 }}>
        <SpeedIcon />
      </ToggleButton>
      <ToggleButton value="reset" selected onChange={reset}>
        <ReplayIcon />
      </ToggleButton>
    </Stack>
  );
}

export default Controller;
