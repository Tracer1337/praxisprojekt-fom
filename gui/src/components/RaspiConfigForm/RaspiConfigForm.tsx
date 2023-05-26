import { useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useSubmit from "./hooks/useSubmit";
import { RaspiConfigFormData } from "./types";

function RaspiConfigForm({
  onSubmit,
}: {
  onSubmit: (data: RaspiConfigFormData) => void;
}) {
  const [host, setHost] = useState(window.location.hostname);

  const { isLoading, error, submit, formSubmit } = useSubmit({
    onSubmit,
    data: { host },
  });

  return (
    <form onSubmit={formSubmit}>
      <TextField
        label="Host"
        fullWidth
        sx={{ mb: 2 }}
        value={host}
        onChange={(event) => setHost(event.currentTarget.value)}
        error={!!error.host}
        helperText={error.host ?? "Die IP-Adresse deines Raspberry-Pis"}
      />
      <LoadingButton
        variant="outlined"
        fullWidth
        onClick={submit}
        loading={isLoading}
      >
        Verbinden
      </LoadingButton>
    </form>
  );
}

export default RaspiConfigForm;
