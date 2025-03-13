import { configureStore } from '@reduxjs/toolkit'
import chatReducer from "./chat-slice.js"

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
})
