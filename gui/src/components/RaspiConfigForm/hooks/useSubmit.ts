import { FormEvent, useState } from "react";
import { getRaspiConfig } from "../../../lib/raspi";
import { RaspiConfigFormData, RaspiConfigFormError } from "../types";

function useSubmit({
  data,
  onSubmit,
}: {
  data: RaspiConfigFormData;
  onSubmit: (data: RaspiConfigFormData) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RaspiConfigFormError>({});

  const submit = () => {
    setIsLoading(true);
    fetch(getRaspiConfig(data.host).healtchCheckUrl)
      .then((res) => res.text())
      .then((text) => {
        if (text !== "available") {
          throw new Error();
        }
        onSubmit(data);
      })
      .catch(() => setError({ host: "Der Host ist nicht erreichbar" }))
      .finally(() => setIsLoading(false));
  };

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  return { isLoading, error, submit, formSubmit };
}

export default useSubmit;
