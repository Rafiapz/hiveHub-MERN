import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import postReducer from "./slices/posts/postSlice";
import networkReducer from "./slices/network/networkSlice";
import messageReducer from "./slices/messages/messagesSlice";

export const store = configureStore({
   reducer: {
      user: userReducer,
      posts: postReducer,
      networks: networkReducer,
      messages: messageReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
