

import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../actions/message/messageActions";



const initialState = {

    conversations: [],
    messages: [],
    socket: null

}

const messagesSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        newMessage: (state, action) => {
            state.messages = action?.payload?.data
        },
        setSocket: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.messages = action?.payload?.data
            })
    }
})


export const { newMessage, setSocket } = messagesSlice.actions;



export default messagesSlice.reducer;    