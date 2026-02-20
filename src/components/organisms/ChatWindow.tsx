import { useChat } from "@/hooks/useChat";
import { MessageList } from "@/components/organisms/MessageList";
import { ChatInput } from "@/components/molecules/ChatInput";
import { ErrorBanner } from "@/components/molecules/ErrorBanner";
import { cn } from "@/lib/utils";
import type { BackendStatus } from "@/hooks/useHealthCheck";

interface ChatWindowProps {
  backendStatus: BackendStatus;
}

export function ChatWindow({ backendStatus }: ChatWindowProps) {
  const { messages, isLoading, error, send } = useChat();

  const statusConfig = {
    online:   { dot: "bg-emerald-400",            pill: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400", label: "Online" },
    offline:  { dot: "bg-red-400 animate-pulse",  pill: "bg-red-500/10 border-red-500/25 text-red-500",                                  label: "Offline" },
    checking: { dot: "bg-amber-400 animate-pulse", pill: "bg-amber-500/10 border-amber-500/25 text-amber-500",                           label: "Checking..." },
  }[backendStatus];

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-border/60 bg-card/60 glass shrink-0 shadow-soft">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Conversation</h2>
          <p className="text-md text-muted-foreground mt-0.5">
            {isLoading
              ? "Querying your database..."
              : messages.length === 0
              ? "Ready — ask anything about your data"
              : `${messages.length} message${messages.length !== 1 ? "s" : ""} this session`}
          </p>
        </div>
        <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-md font-medium transition-all duration-300", statusConfig.pill)}>
          <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", statusConfig.dot)} />
          {isLoading ? "Processing" : statusConfig.label}
        </div>
      </div>

      <MessageList messages={messages} isLoading={isLoading} />
      {error && <ErrorBanner message={error} />}
      <ChatInput onSend={send} isLoading={isLoading} disabled={backendStatus === "offline"} />
    </div>
  );
}