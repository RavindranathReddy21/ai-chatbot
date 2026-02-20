import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendMessage as sendMessageApi } from "@/api/chat.api";

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (content: string, { rejectWithValue }) => {
    try {
      const data = await sendMessageApi({ message: content });
      return data.reply ??  "There was an issue with the response. Please try again.";
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearMessages(state) {
      state.messages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // Optimistically add user message
        state.messages.push({
          id: crypto.randomUUID(),
          role: "user",
          content: action.meta.arg,
          timestamp: Date.now(),
        });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
  state.isLoading = false;
  state.messages.push({
    id: crypto.randomUUID(),
    role: "assistant",
    content: action.payload as string,
    timestamp: Date.now(),
  });
})
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessages } = chatSlice.actions;
export default chatSlice.reducer;