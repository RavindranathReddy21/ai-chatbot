import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { clear, messages } = useChat();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-64 h-full flex flex-col bg-[hsl(var(--sidebar-bg))] border-r border-border/50">
      {/* Header */}
      <div className="px-5 py-5 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-soft">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">SQL Assistant</h1>
            <p className="text-[10px] text-muted-foreground">AI-powered queries</p>
          </div>
        </div>
      </div>

      {/* Session info */}
      <div className="px-5 py-4 flex-1">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Current Session
        </p>
        <div className="bg-card rounded-xl border border-border/60 p-3 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Messages</span>
            <span className="text-xs font-semibold text-foreground">{messages.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Status</span>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Try asking
          </p>
          {[
            "What products do we have?",
            "Show me total sales",
            "List top customers",
          ].map((tip) => (
            <div
              key={tip}
              className="text-xs text-muted-foreground py-1.5 px-2 rounded-lg hover:bg-accent/50 hover:text-foreground cursor-default transition-colors duration-150 truncate"
            >
              {tip}
            </div>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-5 py-4 border-t border-border/50 flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-150"
        >
          {theme === "dark" ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
              Light mode
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              Dark mode
            </>
          )}
        </button>

        <button
          onClick={clear}
          disabled={messages.length === 0}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-150",
            messages.length === 0
              ? "text-muted-foreground/40 cursor-not-allowed"
              : "text-destructive hover:bg-destructive/10"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
          </svg>
          Clear conversation
        </button>
      </div>
    </aside>
  );
}