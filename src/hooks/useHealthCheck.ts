import { useState, useEffect } from "react";
import client from "@/api/client";

export type BackendStatus = "online" | "offline" | "checking";

export function useHealthCheck(intervalMs = 15000) {
  const [status, setStatus] = useState<BackendStatus>("checking");

  const check = async () => {
    try {
      await client.get("/health", { timeout: 4000 });
      setStatus("online");
    } catch {
      setStatus("offline");
    }
  };

  useEffect(() => {
    check(); // immediate check on mount
    const interval = setInterval(check, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return status;
}