import { Grid, Box, Typography } from "@mui/material";
import { isMobile } from "../../lib/responsive";

function Action() {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box sx={{ width: 48, height: 48, backgroundColor: "lightgray" }} />
      </Grid>
      <Grid item sx={{ color: isMobile ? "white" : null }}>
        <Typography>Rechts fahren</Typography>
        <Typography>
          in <strong>5</strong> Metern
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Action;
