import { createAsyncThunk } from "@reduxjs/toolkit";
import {IUserSignupdata} from '../../../interfaces/IUserSignup'
import { IOtp } from "../../../interfaces/IOtp";
import { IUserLogin } from "../../../interfaces/IUserLogin";
import apiClient from "../../../utils/axios";
import { jsonConfig, multiPartConfig } from "../../../utils/apiUtils";
import { EDIT_USER_PROFILE_URL, FETCH_USER_URL, LOGIN_URL, LOGOUT_URL, OTP_VERIFICATION_URL, RESEND_OTP_URL, SIGNUP_URL } from "../../../utils/endPoint";


export const signupAction=createAsyncThunk( '/signup',async (userCredentials:IUserSignupdata,{})=>{   
        try {
            const response=await apiClient.post(SIGNUP_URL,userCredentials,jsonConfig)              
       
            return response.data
            
        } catch (error:any) {
            throw new Error (error.message)
        }
    }
)

export const otpVerification=createAsyncThunk('/otp-verification',async (data:IOtp,{})=>{

    try {

        const response=await apiClient.post(OTP_VERIFICATION_URL,data,jsonConfig)
        console.log(response.data);
        
        return response.data
        
        
    } catch (error:any) {
        throw new Error (error.message)
    }
})

export const resendOtpAction=createAsyncThunk('/resend-otp',async (email:string|null)=>{

    try {

        const response=await apiClient.get(`${RESEND_OTP_URL}?email=${email}`)
                
        return response.data
        
        
    } catch (error:any) {
        throw new Error (error.message)
    }
})



export const loginAction=createAsyncThunk('/login',async (data:IUserLogin)=>{

    try {
            
        const response=await apiClient.post(LOGIN_URL,data)
       
        return response.data
    } catch (error:any) {
        throw new Error(error.message)
    }
})

export const logoutAction=createAsyncThunk('/logout',async ()=>{

    try {
       
       const response= await apiClient.get(LOGOUT_URL)
             
       return response.data
       
        
    } catch (error) {
        
    }
})

export const fetchuser=createAsyncThunk('/auth/fetch',async ()=>{

    try {
               
        const response=await apiClient.get(FETCH_USER_URL,)
             
        if(response.data.status!=='ok'){
            throw new Error('Not authorized')
        }
              
        return response.data
        
        
    } catch (error:any) {
        throw new Error(error.message)
    }
})

export const loginWithGoogle=createAsyncThunk('/auth/google',async (accessToken:any,{rejectWithValue})=>{

    try {

        const response=await apiClient.post('/auth/google',{googleAccesToken:accessToken})
        console.log(response.data);
        
        return response.data
        
        
    } catch (error:any) {
        rejectWithValue(error.message)     
    }
})

export const editUserProfile=createAsyncThunk('/auth/edit-user-profile',async ({formData,type}:any)=>{
    try {
                
        const response=await apiClient.post(`${EDIT_USER_PROFILE_URL}/image?${[type]}=${type}`,formData,multiPartConfig)
        console.log(response);
        return response.data
        
        
    } catch (error:any) {
        throw new Error (error.message)
    }
})