import { MessageBubble } from "@/components/molecules/MessageBubble";
import { TypingIndicator } from "@/components/atoms/TypingIndicator";
import { Avatar } from "@/components/atoms/Avatar";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import type { Message } from "@/store/chatStore";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollRef = useScrollToBottom<HTMLDivElement>(messages.length + (isLoading ? 1 : 0));

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4"
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center pb-12">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Ask your database anything</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Type a question in plain English and I'll query your database and explain the results.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {["What products do we have?", "Show total sales", "List all customers"].map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border/60 text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 max-w-3xl mx-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-end gap-2.5 message-enter">
              <Avatar role="assistant" />
              <div className="bg-card border border-border/60 rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft">
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}