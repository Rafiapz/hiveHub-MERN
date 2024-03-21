import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/user/userSlice';
import postReducer from "./slices/posts/postSlice";


export const store=configureStore({
    reducer:{
        user:userReducer,
        posts:postReducer
    }
})


export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch