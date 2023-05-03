import { useState, ReactEventHandler } from "react";
import { Box, Stack, Typography } from "@mui/material";

function ImageWithDimensionLabel({ url }: { url: string }) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleImageLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    setDimensions({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    });
  };

  return (
    <Stack>
      <Box
        component="img"
        src={url}
        sx={{ height: 50 }}
        onLoad={handleImageLoad}
      />
      {dimensions && (
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          {dimensions.width}x{dimensions.height}
        </Typography>
      )}
    </Stack>
  );
}

export default ImageWithDimensionLabel;
