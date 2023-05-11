import { Grid, Box, Typography } from "@mui/material";

function Action() {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box sx={{ width: 48, height: 48, backgroundColor: "lightgray" }} />
      </Grid>
      <Grid item>
        <Typography>Rechts fahren</Typography>
        <Typography>
          in <strong>5</strong> Metern
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Action;
