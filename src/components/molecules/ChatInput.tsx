import { useState, type KeyboardEvent, useRef } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const canSend = value.trim() && !isLoading;

  return (
    <div className="px-4 pb-4 pt-3 border-t border-border/50 bg-background">
      <div className="relative flex items-end gap-2 bg-card border border-border/80 rounded-2xl shadow-soft px-4 py-3 focus-within:border-primary/50 focus-within:shadow-lifted transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Ask anything..."
          disabled={isLoading}
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none leading-relaxed max-h-40 scrollbar-thin disabled:opacity-50"
          style={{ minHeight: "24px" }}
          autoFocus
        />
        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className={cn(
            "shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-all duration-200",
            canSend
              ? "bg-primary text-primary-foreground hover:opacity-90 hover:scale-105 active:scale-95 shadow-soft"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          )}
        </button>
      </div>
      <p className="text-center text-[10px] text-muted-foreground/40 mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}