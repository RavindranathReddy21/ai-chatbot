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
    <div
      className={cn(
        "message-enter flex items-end gap-2.5 w-full",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar role={message.role} />

      <div
        className={cn(
          "flex flex-col max-w-[72%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words shadow-soft",
            isUser
              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
              : "bg-card text-card-foreground rounded-2xl rounded-bl-sm border border-border/60"
          )}
        >
          {message.content}
        </div>
        <Timestamp timestamp={message.timestamp} />
      </div>
    </div>
  );
}