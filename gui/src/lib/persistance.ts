import { useState } from "react";

export enum StorageKeys {
  RASPI_HOST = "raspi_hots",
}

export function useStoredVariable(key: string) {
  const [value, setValue] = useState<string | null>(localStorage.getItem(key));

  const storeNewValue = (value: string | null) => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
    setValue(localStorage.getItem(key));
  };

  return [value, storeNewValue] as const;
}
