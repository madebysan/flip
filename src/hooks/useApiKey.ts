import { useState, useCallback } from "react";
import { loadApiKey, saveApiKey, clearApiKey } from "../lib/api-key";

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState<string | null>(() => loadApiKey());

  const setApiKey = useCallback((key: string) => {
    saveApiKey(key);
    setApiKeyState(key);
  }, []);

  const removeApiKey = useCallback(() => {
    clearApiKey();
    setApiKeyState(null);
  }, []);

  return { apiKey, setApiKey, removeApiKey };
}
