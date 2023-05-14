import { CircularProgress, Stack, ToggleButton } from "@mui/material";
import useControllerState from "./hooks/useControllerState";
import Joystick from "./Joystick";
import MemoryIcon from "@mui/icons-material/Memory";
import SpeedIcon from "@mui/icons-material/Speed";
import { isMobile } from "../../lib/responsive";

function Controller() {
  const { state, handleMove, handleCamera, setAutomation, setSpeed } =
    useControllerState();

  if (!state) {
    return <CircularProgress />;
  }

  const buttons = (
    <Stack direction="row">
      <ToggleButton
        value="automation"
        selected={state.automation}
        onChange={() => setAutomation(!state.automation)}
        sx={{ mr: 4 }}
      >
        <MemoryIcon />
      </ToggleButton>
      <ToggleButton
        value="speed"
        selected={state.speed}
        onChange={() => setSpeed(!state.speed)}
      >
        <SpeedIcon />
      </ToggleButton>
    </Stack>
  );

  if (isMobile) {
    return (
      <Stack direction="row" spacing={3}>
        <Joystick size={156} onChange={handleMove} />
        {buttons}
        <Joystick size={156} onChange={handleCamera} />
      </Stack>
    );
  }

  return buttons;
}

export default Controller;
