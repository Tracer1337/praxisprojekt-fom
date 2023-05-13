import { CircularProgress, Stack, Button } from "@mui/material";
import useControllerState from "./hooks/useControllerState";
import Joystick from "./Joystick";
import MemoryIcon from "@mui/icons-material/Memory";
import SpeedIcon from "@mui/icons-material/Speed";

function Controller() {
  const [state] = useControllerState();

  if (!state) {
    return <CircularProgress />;
  }

  const handleMovementChange = (data: any) => {
    console.log(data);
  };

  const handleCameraChange = (data: any) => {
    console.log(data);
  };

  return (
    <Stack direction="row" spacing={3}>
      <Joystick size={156} onChange={handleMovementChange} />
      <Stack sx={{ justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "50%",
            width: 48,
            height: 48,
            minWidth: 0,
          }}
        >
          <MemoryIcon sx={{ fontSize: 28 }} />
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "50%",
            width: 48,
            height: 48,
            minWidth: 0,
          }}
        >
          <SpeedIcon sx={{ fontSize: 28 }} />
        </Button>
      </Stack>
      <Joystick size={156} onChange={handleCameraChange} />
    </Stack>
  );
}

export default Controller;
