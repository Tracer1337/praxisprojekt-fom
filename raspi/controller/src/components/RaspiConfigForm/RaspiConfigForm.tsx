import { useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getRaspiConfig } from "../../lib/raspi";

type FormData = {
  host: string;
};

type FormError = {
  host?: string;
};

function RaspiConfigForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [host, setHost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FormError>({});

  const handleSubmit = () => {
    setIsLoading(true);
    fetch(getRaspiConfig(host).healtchCheckUrl)
      .then((res) => res.text())
      .then((text) => {
        if (text !== "available") {
          throw new Error();
        }
        onSubmit({ host });
      })
      .catch(() => setError({ host: "Der Host ist nicht erreichbar" }))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
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
        onClick={handleSubmit}
        loading={isLoading}
      >
        Verbinden
      </LoadingButton>
    </form>
  );
}

export default RaspiConfigForm;
