import { createSlice} from '@reduxjs/toolkit'
import { fetchuser, loginAction, loginWithGoogle, logoutAction, otpVerification } from '../../actions/auth/userActions'


const initialState={

    user:{
        auth:{
            isAuth:false,
            role:''
        },
        loading:false,
        data:null,
        userId:null
    },
    confirmationModal:{
        isOpen:false,
    },
    editUserPhotosModal:{
        isOpen:false,
        type:''
    }
    

}

const userSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        confirmationModalReducer:(state,action)=>{
            state.confirmationModal.isOpen=action.payload.status
        },
        handleEditUserPhotosModal:(state,action)=>{
           state.editUserPhotosModal.isOpen=action?.payload?.status 
           state.editUserPhotosModal.type=action?.payload?.type
        } 
    },
    extraReducers:(builder)=>{
        builder
        .addCase(otpVerification.fulfilled,(state,action)=>{
            if(action.payload.status==='ok'){                               
                state.user.auth.isAuth=true
                state.user.auth.role=action.payload.userData.role
                state.user.data=action.payload.userData
            }
        })
        .addCase(loginAction.fulfilled,(state,action)=>{            
            if(action.payload.status==='ok'){             
                state.user.auth.isAuth=true
                state.user.data=action?.payload?.userData
                state.user.auth.role=action?.payload?.role                         
                state.user.auth.role=action?.payload?.userData?.role
                state.user.userId=action.payload.userData?._id
            }
        })
        .addCase(fetchuser.fulfilled,(state,action)=>{
            if(action.payload.status==='ok'){
            state.user.auth.isAuth=true
            state.user.auth.role=action.payload.userData.role
            state.user.data=action.payload.userData
            state.user.userId=action.payload.userData?._id
            }
        })
        .addCase(fetchuser.rejected,(state)=>{
            state.user.auth.isAuth=false
        })
        .addCase(loginWithGoogle.fulfilled,(state,action)=>{
            state.user.auth.isAuth=true
            state.user.auth.role=action?.payload?.userData?.role
            state.user.data=action?.payload?.userData
            state.user.userId=action?.payload?.userData?._id
        })
        .addCase(logoutAction.fulfilled,(state,action)=>{
            if(action?.payload?.status==='ok'){
            state.user.auth.isAuth=false
            }
        })
    }
   
})

export const {confirmationModalReducer,handleEditUserPhotosModal} =userSlice.actions

export default userSlice.reducer