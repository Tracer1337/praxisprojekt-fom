import { CircularProgress } from "@mui/material";
import useControllerState from "./hooks/useControllerState";

function Controller() {
  const [state] = useControllerState();

  if (!state) {
    return <CircularProgress />;
  }

  return <div>Controller</div>;
}

export default Controller;
