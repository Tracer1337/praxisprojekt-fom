import { CircularProgress, Stack, ToggleButton } from "@mui/material";
import useControllerState from "./hooks/useControllerState";
import Joystick from "./Joystick";
import MemoryIcon from "@mui/icons-material/Memory";
import SpeedIcon from "@mui/icons-material/Speed";
import { isMobile } from "../../lib/responsive";
import useKeyboardControls from "./hooks/useKeyboardControls";

function Controller() {
  const {
    state,
    sendControllerUpdate,
    handleMove,
    handleCamera,
    setAutomation,
    setSpeed,
  } = useControllerState();

  useKeyboardControls({ state, update: sendControllerUpdate });

  if (!state) {
    return <CircularProgress />;
  }

  const buttons = (
    <Stack
      direction="row"
      sx={{
        "& .MuiToggleButton-root, & .MuiToggleButton-root.Mui-selected": {
          backgroundColor: "white !important",
        },
      }}
    >
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
      <Stack
        direction="row"
        spacing={3}
        sx={{ justifyContent: "space-between", alignItems: "flex-end" }}
      >
        <Joystick size={130} onChange={handleMove} />
        {buttons}
        <Joystick size={130} onChange={handleCamera} />
      </Stack>
    );
  }

  return buttons;
}

export default Controller;
