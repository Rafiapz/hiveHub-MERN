import { createSlice} from '@reduxjs/toolkit'
import { createPostAction, editPostAction, fetchAllposts } from '../../actions/post/postActions'



const initialState={

    posts:{
        loading:false,
        data:null,
        error:null
    },
    createPostModal:{
        isOpen:false
    },
    editPostModal:{
        isOpen:false,
        data:{
            content:'',
            media:{
                type:'',
                url:''
            },
            _id:''
        }
    }
}

const postSlice=createSlice({
    
    name:'posts',
    initialState:initialState,
    reducers:{
        handleCreatePostModal:(state)=>{
            state.createPostModal.isOpen=!state.createPostModal.isOpen                 
        },
        handleEditPostModal:(state,action)=>{
            state.editPostModal.isOpen=action?.payload?.status
            if(action.payload.status===true){
                state.editPostModal.data.content=action?.payload?.content
                state.editPostModal.data.media.type=action?.payload?.media?.type
                state.editPostModal.data.media.url=action?.payload?.media?.url
                state.editPostModal.data._id=action?.payload?._id
            }
        }
    },

    extraReducers:(builder)=>{

        builder
        .addCase(fetchAllposts.pending,(state)=>{
            state.posts.loading=true
        })
        .addCase(fetchAllposts.fulfilled,(state,action)=>{
            state.posts.loading=false;
            state.posts.data=action?.payload?.posts

        })
        .addCase(fetchAllposts.rejected,(state)=>{
            state.posts.loading=false;
            state.posts.data=null;           
        })
        .addCase(createPostAction.fulfilled,(state)=>{
            state.createPostModal.isOpen=false
        })
        .addCase(editPostAction.fulfilled,(state)=>{
            state.editPostModal.isOpen=false            
        })
    }
})


export const {handleCreatePostModal,handleEditPostModal} =postSlice.actions

export default postSlice.reducer    