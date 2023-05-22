import { CircularProgress, Stack, ToggleButton } from "@mui/material";
import useControllerState from "./hooks/useControllerState";
import Joystick from "./Joystick";
import MemoryIcon from "@mui/icons-material/Memory";
import SpeedIcon from "@mui/icons-material/Speed";
import { isMobile } from "../../lib/responsive";
import useKeyboardControls from "./hooks/useKeyboardControls";
import useControllerUpdate from "./hooks/useControllerUpdate";

function Controller() {
  const update = useControllerUpdate();

  const { state, handleMove, handleCamera, setAutomation, setSpeed } =
    useControllerState({ update });

  useKeyboardControls({ state, update });

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
        <Joystick size={130} throttle={100} onChange={handleMove} />
        {buttons}
        <Joystick size={130} throttle={100} onChange={handleCamera} />
      </Stack>
    );
  }

  return buttons;
}

export default Controller;
