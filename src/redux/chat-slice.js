import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch chat history
export const fetchChatHistory = createAsyncThunk("chat/fetchHistory", async () => {
  const response = await fetch("http://localhost:8080/chat/history");
  return response.json();
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: { chatMessages: [] },
  reducers: {
    addChat: (state, action) => {
      state.chatMessages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatHistory.fulfilled, (state, action) => {
      state.chatMessages = action.payload;
    });
  }
});

export const { addChat } = chatSlice.actions;
export default chatSlice.reducer;
