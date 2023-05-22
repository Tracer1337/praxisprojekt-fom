import { useState } from "react";
import { Paper, Box } from "@mui/material";

function ImageWithFallback({
  src,
  alt,
  fallbackWidth,
  fallbackHeight,
}: {
  src: string;
  alt: string;
  fallbackWidth: number;
  fallbackHeight: number;
}) {
  const [error, setError] = useState(false);

  return error ? (
    <Paper
      sx={{
        width: fallbackWidth,
        height: fallbackHeight,
        backgroundColor: "lightgray",
      }}
      variant="outlined"
    />
  ) : (
    <Box component="img" src={src} alt={alt} onError={() => setError(true)} />
  );
}

export default ImageWithFallback;
