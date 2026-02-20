import { ChatWindow } from "@/components/organisms/ChatWindow";
import { Sidebar } from "@/components/organisms/Sidebar";
import { useHealthCheck } from "@/hooks/useHealthCheck";

export function ChatPage() {
  const backendStatus = useHealthCheck(15000);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar backendStatus={backendStatus} />
      <main className="flex flex-1 overflow-hidden">
        <ChatWindow backendStatus={backendStatus} />
      </main>
    </div>
  );
}