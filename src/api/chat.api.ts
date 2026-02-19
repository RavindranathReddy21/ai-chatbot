import client from "./client";

export interface SendMessagePayload {
  question: string;
}

export interface SendMessageResponse {
  human_readable_result?: string;
  error?: string;
}

export const sendMessage = async (
  payload: SendMessagePayload
): Promise<SendMessageResponse> => {
  const { data } = await client.post<SendMessageResponse>("/ask", payload);
  return data;
};