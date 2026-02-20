import { useState, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDisabled = isLoading || disabled;

  const handleSend = () => {
    if (!value.trim() || isDisabled) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const canSend = value.trim() && !isDisabled;

  return (
    <div className="px-4 pb-4 pt-3 border-t border-border/50 bg-background shrink-0">
      {disabled && (
        <div className="flex items-center gap-2 text-lg text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 mb-3">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Backend is offline — start your FastAPI server to continue
        </div>
      )}
      <div className={cn(
        "flex items-end gap-3 bg-card border rounded-2xl px-4 py-3 transition-all duration-200 shadow-soft",
        "focus-within:border-primary/50 focus-within:shadow-lifted border-border/80",
        disabled && "opacity-60"
      )}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder={disabled ? "Backend offline..." : "Ask anything about your data..."}
          disabled={isDisabled}
          rows={1}
          className="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none scrollbar-thin disabled:cursor-not-allowed chat-input-text"
          style={{ minHeight: "24px", maxHeight: "160px" }}
          autoFocus={!disabled}
        />
        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send"
          className={cn(
            "shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-200",
            canSend
              ? "gradient-primary text-white shadow-soft hover:opacity-90 hover:scale-105 active:scale-95 bubble-glow"
              : "bg-muted text-muted-foreground/40 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
            </svg>
          )}
        </button>
      </div>
      {!disabled && (
        <p className="text-center text-xs text-muted-foreground/40 mt-2 select-none">
          Enter to send · Shift+Enter for new line
        </p>
      )}
    </div>
  );
}