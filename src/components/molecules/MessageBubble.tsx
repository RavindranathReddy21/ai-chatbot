import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { Timestamp } from "@/components/atoms/Timestamp";
import type { Message } from "@/store/chatStore";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("message-enter flex items-end gap-3 w-full", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar role={message.role} />
      <div className={cn("flex flex-col max-w-[72%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl whitespace-pre-wrap break-words chat-message",
            isUser
              ? "gradient-primary text-white rounded-br-sm bubble-glow"
              : "bg-card text-card-foreground rounded-bl-sm border border-border/70 shadow-soft"
          )}
        >
          {message.content}
        </div>
        <Timestamp timestamp={message.timestamp} />
      </div>
    </div>
  );
}