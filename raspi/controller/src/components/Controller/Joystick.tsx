import { Paper, Box } from "@mui/material";
import useJoystickControls from "./hooks/useJoystickControls";

function Joystick({
  size,
  onChange,
}: {
  size: number;
  onChange: (data: { x: number; y: number }) => void;
}) {
  const { thumbRef } = useJoystickControls({ size, onChange });

  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: "50%", width: size, height: size }}
    >
      <Box
        ref={thumbRef}
        sx={{
          width: "50%",
          height: "50%",
          backgroundColor: "lightgray",
          borderRadius: "50%",
        }}
      />
    </Paper>
  );
}

export default Joystick;
