import { ReactEventHandler, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";
import { getGTSDBImageUrl } from "../../lib/gh-content";
import { useAnnotationData } from "./hooks/useAnnotationData";
import BoxOverlay from "./BoxOverlay";

function GTSDB() {
  const [imageNumber, setImageNumber] = useState(0);

  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [isLoading, getAnnotationsForImageNumber] = useAnnotationData();

  const handleImageNumberChange: ReactEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setImageNumber(
      Math.min(Math.max(parseInt(event.currentTarget.value), 0), 899)
    );
  };

  const handleImageLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    // Alle Bilder haben die gleichen Dimensionen, also können sie hier einfach
    // beibehalten werden.
    if (imageDimensions) {
      return;
    }

    setImageDimensions({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        German Traffic Sign Detection Benchmark (GTSDB)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            type="number"
            label="Bild Nummer"
            value={imageNumber}
            onChange={handleImageNumberChange}
            fullWidth
            sx={{ mb: 1 }}
          />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Paper variant="outlined">
              <Box component="pre" sx={{ height: 350, overflowY: "auto" }}>
                {JSON.stringify(
                  getAnnotationsForImageNumber(imageNumber),
                  null,
                  2
                )}
              </Box>
            </Paper>
          )}
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={getGTSDBImageUrl(imageNumber)}
              sx={{ width: "100%" }}
              onLoad={handleImageLoad}
            />
            {imageDimensions &&
              getAnnotationsForImageNumber(imageNumber)?.map(
                (annotations, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "absolute",
                      top: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <BoxOverlay
                      box={annotations}
                      imageDimensions={imageDimensions}
                    />
                  </Box>
                )
              )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GTSDB;
