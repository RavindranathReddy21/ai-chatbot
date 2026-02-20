import client from "./client";

export interface SendMessagePayload {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export interface SendMessageResponse {
  reply: string;
  tool_used?: string | null;
  sql_query?: string | null;
}

export const sendMessage = async (
  payload: SendMessagePayload
): Promise<SendMessageResponse> => {
  const { data } = await client.post<SendMessageResponse>("/chat", payload);
  return data;
};