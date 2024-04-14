

import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../actions/message/messageActions";



const initialState = {

    conversations: [],
    messages: null

}

const messagesSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.messages = action?.payload?.data
            })

    }

})


export const { } = messagesSlice.actions;



export default messagesSlice.reducer;    