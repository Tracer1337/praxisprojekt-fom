import { useState } from "react";
import { Box, Typography, Grid, Paper, Pagination } from "@mui/material";
import { GTSRBDataset, getGTSRBImageUrls } from "../../lib/gh-content";
import ObjectSelect from "./ObjectSelect";
import ImageWithDimensionLabel from "./ImageWithDimensionLabel";

function GTSRB() {
  const [object, setObject] = useState(GTSRBDataset[0]);

  const [page, setPage] = useState(1);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        German Traffic Sign Recognition Benchmark (GTSRB)
      </Typography>

      <Box sx={{ mb: 2 }}>
        <ObjectSelect
          value={object}
          onChange={(newObject) => setObject(newObject)}
        />
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container>
          {getGTSRBImageUrls(object.objectId, page - 1).map((url, i) => (
            <Grid
              item
              xs={2}
              sx={{ display: "flex", justifyContent: "center" }}
              key={i}
            >
              <ImageWithDimensionLabel url={url} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Pagination
        count={object.tracks}
        variant="outlined"
        page={page}
        onChange={(_event, page) => setPage(page)}
        sx={{ my: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}

export default GTSRB;
