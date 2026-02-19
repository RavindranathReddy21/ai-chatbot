import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendMessage, clearMessages } from "@/store/chatStore";

export function useChat() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const error = useAppSelector((state) => state.chat.error);

  const send = (content: string) => {
    if (!content.trim() || isLoading) return;
    dispatch(sendMessage(content));
  };

  const clear = () => dispatch(clearMessages());

  return { messages, isLoading, error, send, clear };
}