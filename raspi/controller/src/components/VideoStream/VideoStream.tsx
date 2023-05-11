import { useState } from "react";
import { Paper, Box } from "@mui/material";

function VideoStream({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  return error ? (
    <Paper
      sx={{ width: 640, height: 480, backgroundColor: "lightgray" }}
      variant="outlined"
    />
  ) : (
    <Box component="img" src={src} alt={alt} onError={() => setError(true)} />
  );
}

export default VideoStream;
