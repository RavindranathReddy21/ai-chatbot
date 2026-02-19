import { ChatWindow } from "@/components/organisms/ChatWindow";
import { Sidebar } from "@/components/organisms/Sidebar";

export function ChatPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex flex-1 overflow-hidden">
        <ChatWindow />
      </main>
    </div>
  );
}