import { ReactEventHandler, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";
import { getGTSDBImageUrl } from "../../../lib/gh-content";
import { useAnnotationData } from "./hooks/useAnnotationData";
import ImageWithObjects from "../../../components/ImageWithObjects/ImageWithObjects";

function GTSDB() {
  const [imageNumber, setImageNumber] = useState(0);

  const { isLoading, getAnnotationsForImageNumber, toObjectDetections } =
    useAnnotationData();

  const handleImageNumberChange: ReactEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setImageNumber(
      Math.min(Math.max(parseInt(event.currentTarget.value), 0), 899)
    );
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
          <ImageWithObjects
            src={getGTSDBImageUrl(imageNumber)}
            objects={toObjectDetections(
              getAnnotationsForImageNumber(imageNumber) ?? []
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default GTSDB;
