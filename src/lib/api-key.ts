const KEY = "flip-anthropic-key";

export function loadApiKey(): string | null {
  return localStorage.getItem(KEY);
}

export function saveApiKey(key: string): void {
  localStorage.setItem(KEY, key);
}

export function clearApiKey(): void {
  localStorage.removeItem(KEY);
}
