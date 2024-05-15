import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../actions/message/messageActions";
import { connect, io } from "socket.io-client";





const initialState = {

    conversations: [],
    messages: [],
    // socket: JSON.stringify(socket)

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