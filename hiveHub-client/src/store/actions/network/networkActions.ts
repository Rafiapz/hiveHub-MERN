import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/axios";
import { CONNECTION_REQUEST_URL } from "../../../utils/endPoint";


export const connectionRequestAction = createAsyncThunk('/network/connection-request', async (targetUserId:number, { rejectWithValue }) => {

    try {

        
        const response=await apiClient.post(`${CONNECTION_REQUEST_URL}/${targetUserId}`)
        console.log(response.data);
        
        return response.data
        
    } catch (error:any) {
        rejectWithValue(error.messge)
    }
})