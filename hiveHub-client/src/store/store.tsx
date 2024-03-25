import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/user/userSlice';
import postReducer from "./slices/posts/postSlice";
import networkReducer from './slices/network/networkSlice'


export const store=configureStore({
    reducer:{
        user:userReducer,
        posts:postReducer,
        networks:networkReducer
    }
})


export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch