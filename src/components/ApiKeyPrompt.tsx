import { useEffect, useState } from "react";

interface ApiKeyPromptProps {
  initialKey?: string;
  onSave: (key: string) => void;
  onClose: () => void;
  onClear?: () => void;
}

export function ApiKeyPrompt({ initialKey, onSave, onClose, onClear }: ApiKeyPromptProps) {
  const [value, setValue] = useState(initialKey ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Paste your key first.");
      return;
    }
    if (!trimmed.startsWith("sk-ant-")) {
      setError("That doesn't look like an Anthropic key. They start with sk-ant-.");
      return;
    }
    onSave(trimmed);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface dark:bg-dark-card rounded-2xl p-8"
        style={{ boxShadow: "var(--shadow-warm)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[24px] font-light leading-[1.17] tracking-[-0.2px] text-text-primary dark:text-dark-text mb-2">
          Anthropic API key
        </h2>
        <p className="text-[14px] leading-[1.5] tracking-[0.14px] text-text-secondary dark:text-dark-text-secondary mb-6">
          Flip calls Claude directly from your browser using your key.
          It's stored locally and never sent anywhere else. Get one at{" "}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-text-primary dark:text-dark-text hover:opacity-70 transition-opacity"
          >
            console.anthropic.com
          </a>
          .
        </p>

        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          placeholder="sk-ant-..."
          autoFocus
          className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface-alt text-text-primary dark:text-dark-text placeholder:text-text-muted/50 dark:placeholder:text-dark-text-muted/50 focus:outline-none text-[14px] tracking-[0.14px] font-mono"
          style={{ boxShadow: "var(--shadow-inset)" }}
        />

        {error && (
          <p className="text-[13px] text-red-600 dark:text-red-400 mt-3 tracking-[0.14px]">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-6 gap-3">
          {onClear && initialKey ? (
            <button
              onClick={() => {
                onClear();
                onClose();
              }}
              className="text-[13px] text-text-muted dark:text-dark-text-muted hover:text-text-secondary dark:hover:text-dark-text-secondary transition-colors underline underline-offset-2"
            >
              Remove key
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 text-[14px] font-medium rounded-full text-text-secondary dark:text-dark-text-secondary hover:bg-warm-stone dark:hover:bg-dark-surface-alt transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-full bg-text-primary dark:bg-dark-text text-surface dark:text-dark-surface text-[14px] font-medium tracking-[0.14px] hover:opacity-90 transition-opacity"
              style={{ boxShadow: "var(--shadow-button)" }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
