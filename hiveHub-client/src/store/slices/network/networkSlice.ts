import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    network: {
        loading: false,
        error: null,
        data: null
    }
}

const networkSlice = createSlice({
    name: 'networks',
    initialState: initialState,
    reducers: {

    }
})


export const { } = networkSlice.actions;



export default networkSlice.reducer;    