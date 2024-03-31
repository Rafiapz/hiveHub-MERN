import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNetworks } from "../../actions/network/networkActions";


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

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllNetworks.fulfilled, (state, action) => {
                console.log(action?.payload?.data);

                state.network.data = action?.payload?.data
            })
    }

})


export const { } = networkSlice.actions;



export default networkSlice.reducer;    