import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/lib/theme";
import { AccessibilityPanel } from "@/components/organisms/AccessibilityPanel";
import { cn } from "@/lib/utils";
import type { BackendStatus } from "@/hooks/useHealthCheck";

interface SidebarProps {
  backendStatus: BackendStatus;
}

export function Sidebar({ backendStatus }: SidebarProps) {
  const { clear, messages } = useChat();
  const { theme, toggleTheme } = useTheme();

  const statusConfig = {
    online:   { dot: "bg-emerald-400",             text: "text-emerald-500", label: "Connected" },
    offline:  { dot: "bg-red-400 animate-pulse",   text: "text-red-500",     label: "Offline" },
    checking: { dot: "bg-amber-400 animate-pulse", text: "text-amber-500",   label: "Checking..." },
  }[backendStatus];

  return (
    <aside className="w-64 h-full flex flex-col bg-[hsl(var(--sidebar-bg))] border-r border-border/50">
      {/* Header */}
      <div className="px-5 py-5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-lifted shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span className={cn(
              "absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[hsl(var(--sidebar-bg))]",
              backendStatus === "online" ? "bg-emerald-400" : backendStatus === "offline" ? "bg-red-400" : "bg-amber-400"
            )} />
          </div>
          <div>
            <h1 className="text-md font-semibold text-foreground leading-tight">SQL Assistant</h1>
            <p className="text-sm text-muted-foreground">AI-powered queries</p>
          </div>
        </div>
      </div>

      {/* Stats card */}
      <div className="px-4 pt-4">
        <div className="bg-card rounded-xl border border-border/60 p-3.5 shadow-soft">
          <p className="chat-sidebar-text font-semibold text-muted-foreground uppercase tracking-widest mb-3" style={{ fontSize: "10px" }}>
            Session
          </p>
          <div className="flex items-center justify-between mb-2.5">
            <span className="chat-sidebar-text text-muted-foreground">Messages</span>
            <span className="chat-sidebar-text font-semibold tabular-nums bg-muted px-2 py-0.5 rounded-md">
              {messages.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="chat-sidebar-text text-muted-foreground">Backend</span>
            <span className={cn("flex items-center gap-1.5 chat-sidebar-text font-medium", statusConfig.text)}>
              <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", statusConfig.dot)} />
              {statusConfig.label}
            </span>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="px-4 pt-4">
        <p className="text-muted-foreground uppercase tracking-widest mb-2 px-1" style={{ fontSize: "10px", fontWeight: 600 }}>
          Suggestions
        </p>
        <div className="flex flex-col gap-0.5">
          {[
            { icon: "📦", text: "What products do we have?" },
            { icon: "📊", text: "Show me total sales" },
            { icon: "👥", text: "List top customers" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 chat-sidebar-text text-muted-foreground py-2 px-2.5 rounded-lg hover:bg-accent/60 hover:text-foreground cursor-default transition-all duration-150"
            >
              <span className="text-base leading-none shrink-0">{icon}</span>
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* Footer */}
      <div className="px-4 pb-4 pt-3 border-t border-border/50 flex flex-col gap-1.5">
        <AccessibilityPanel />

        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl chat-sidebar-text text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-150"
        >
          {theme === "dark" ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
              Switch to Light
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              Switch to Dark
            </>
          )}
        </button>

        <button
          onClick={clear}
          disabled={messages.length === 0}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl chat-sidebar-text transition-all duration-150",
            messages.length === 0
              ? "text-muted-foreground/30 cursor-not-allowed"
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