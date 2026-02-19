import { useChat } from "@/hooks/useChat";
import { MessageList } from "@/components/organisms/MessageList";
import { ChatInput } from "@/components/molecules/ChatInput";
import { ErrorBanner } from "@/components/molecules/ErrorBanner";

export function ChatWindow() {
  const { messages, isLoading, error, send } = useChat();

  return (
    <div className="flex flex-col h-full w-full">
      <MessageList messages={messages} isLoading={isLoading} />
      {error && <ErrorBanner message={error} />}
      <ChatInput onSend={send} isLoading={isLoading} />
    </div>
  );
}