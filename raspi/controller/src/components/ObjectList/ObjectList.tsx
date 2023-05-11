import { Grid, Box } from "@mui/material";
import { ObjectDetection } from "../../lib/raspi";

function ObjectList({
  objects,
  getImageUrl,
}: {
  objects: ObjectDetection[];
  getImageUrl: (objectId: number) => string;
}) {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        height: "100%",
        flexDirection: "column",
        alignContent: "flex-start",
      }}
    >
      {objects.map((object, i) => (
        <Grid item>
          <Box
            key={i}
            component="img"
            src={getImageUrl(object.class)}
            alt={object.name}
            sx={{ width: 64 }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ObjectList;
