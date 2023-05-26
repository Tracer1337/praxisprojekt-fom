import { Grid, Box } from "@mui/material";
import { ObjectDetection } from "../../lib/raspi";
import { isMobile } from "../../lib/responsive";

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
        flexDirection: isMobile ? "row-reverse" : "column",
        alignContent: "flex-start",
      }}
    >
      {objects.map((object, i) => (
        <Grid item key={i}>
          <Box
            component="img"
            src={getImageUrl(object.class)}
            alt={object.name}
            sx={{ width: isMobile ? 48 : 64 }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ObjectList;
