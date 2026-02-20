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
    <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin relative">
      <div className="absolute inset-0 chat-grid-bg opacity-40 pointer-events-none" />
      <div className="relative px-6 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-heavy">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div className="absolute -inset-4 gradient-primary rounded-3xl opacity-15 blur-xl -z-10" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Ask your database anything</h3>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-sm leading-relaxed">
                Type a question in plain English — I'll write the SQL, run it, and explain the results clearly.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {[
                "What products do we have?",
                "Show me total sales",
                "List all customers",
                "Which product is most expensive?",
              ].map((s) => (
                <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-card border border-border/70 text-muted-foreground shadow-soft hover:border-primary/40 hover:text-foreground transition-all duration-150 cursor-default">
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
              <div className="flex items-end gap-3 message-enter">
                <Avatar role="assistant" />
                <div className="bg-card border border-border/70 rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}