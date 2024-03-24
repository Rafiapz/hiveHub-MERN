import { createAsyncThunk } from "@reduxjs/toolkit"
import { CREATE_POST_URL, DELETE_COMMENT_URL, DELETE_POST_URL, EDIT_POST_URL, FETCH_ALL_COMMENTS_URL, FETCH_ALL_POSTS_URL, LIKE_POST_URL, POST_COMMENT_URL } from "../../../utils/endPoint"
import { jsonConfig, multiPartConfig } from "../../../utils/apiUtils"
import apiClient from "../../../utils/axios"


export const createPostAction = createAsyncThunk('/post/create', async (form: any) => {

    try {

        let params
        if (form.has('image'))
            params = 'image'
        else if (form.has('video'))
            params = 'video'

        const response = await apiClient.post(`${CREATE_POST_URL}/${params}`, form, multiPartConfig)
        console.log(response);

        return response.data
    } catch (error: any) {
        console.log(error);


    }
})


export const editPostAction = createAsyncThunk('/post/edit', async ({ formData, originalUrl, postId, type }: any) => {

    try {

        let params
        if (formData.has('image'))
            params = 'image'
        else if (formData.has('video'))
            params = 'video'

        if (!params) {
            const media = { url: originalUrl, type: type };
            console.log(media);

            formData.append("media", JSON.stringify(media));
        }


        const response = await apiClient.put(`${EDIT_POST_URL}/${params}?postId=${postId}`, formData, multiPartConfig)
        console.log(response.data)
        return response.data


    } catch (error: any) {
        console.log(error);


    }
})

export const fetchAllposts = createAsyncThunk('/post/fetch-all-posts', async () => {

    try {

        const response = await apiClient.get(FETCH_ALL_POSTS_URL)
        console.log(response.data);
        return response.data

    } catch (error: any) {

        console.log(error);

    }
})

export const deletePostAction = createAsyncThunk('/posts/delete-post', async (id: number) => {
    try {

        const response = await apiClient.delete(`${DELETE_POST_URL}?id=${id}`)
        console.log(response.data);
        return response.data

    } catch (error: any) {
        console.log(error);


    }
})

export const likePostAction = createAsyncThunk('/post/like-post', async (id: number) => {

    try {

        const response = await apiClient.post(`${LIKE_POST_URL}/${id}`)
        console.log(response);
        return response.data

    } catch (error: any) {
        console.log(error.message);


    }
})

export const fetchAllCommentsOfPost=createAsyncThunk('/post/fetch-all-comments',async (id:any)=>{

    try {
        
        const response=await apiClient.get(`${FETCH_ALL_COMMENTS_URL}/${id}`)
        
        return response.data
        
    } catch (error:any) {
        console.log(error);
        
    }
})

export const postComment=createAsyncThunk('/post/post-comment',async ({formData,postId}:any)=>{

    try {
        console.log('id here',postId);
        
        const response=await apiClient.post(`${POST_COMMENT_URL}/${postId}`,formData,jsonConfig)
        console.log(response.data);
        
        return response.data
        
        
    } catch (error:any) {
        console.log(error.message);
        
    }
})

export const deleteComment=createAsyncThunk('/post/delete-comment',async(commentId:number)=>{

    try {

        const response=await apiClient.delete(`${DELETE_COMMENT_URL}/${commentId}`)

        console.log(response.data);
        return response.data
        

    } catch (error:any) {
        console.log(error.message);
        
    }
})