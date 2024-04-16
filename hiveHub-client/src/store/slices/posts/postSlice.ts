import { createSlice } from '@reduxjs/toolkit'
import { createPostAction, editPostAction, fetchAllCommentsOfPost, fetchAllStories, fetchAllposts, fetchUsersLikedPosts, fetchUsersPost } from '../../actions/post/postActions'




const initialState = {

    posts: {
        loading: false,
        data: null,
        likes: null,
        error: null
    },
    createPostModal: {
        isOpen: false
    },
    editPostModal: {
        isOpen: false,
        data: {
            content: '',
            media: {
                type: '',
                url: ''
            },
            _id: ''
        }
    },
    comments: {
        modalIsOpen: false,
        error: null,
        loading: false,
        data: null,
        postId: null
    },
    report: {
        postId: null
    },
    likedPosts: {
        data: null,
        likes: null
    },
    stories: {
        data: null
    }
}

const postSlice = createSlice({

    name: 'posts',
    initialState: initialState,
    reducers: {
        handleCreatePostModal: (state) => {
            state.createPostModal.isOpen = !state.createPostModal.isOpen
        },
        handleEditPostModal: (state, action) => {
            state.editPostModal.isOpen = action?.payload?.status
            if (action.payload.status === true) {
                state.editPostModal.data.content = action?.payload?.content
                state.editPostModal.data.media.type = action?.payload?.media?.type
                state.editPostModal.data.media.url = action?.payload?.media?.url
                state.editPostModal.data._id = action?.payload?._id
            }
        },
        handleCommentModal: (state, action) => {
            state.comments.modalIsOpen = action?.payload?.status
            state.comments.postId = action?.payload?.postId


        },
        handleCommentsData: (state, action) => {
            state.comments.data = action?.payload?.data
        },
        handleCommentsIsEditing: (state, action) => {
            if (state.comments.data !== null)
                state.comments.data = action?.payload

        },
        handleCommentDeleteReducer: (state, action) => {
            state.comments.data = action?.payload
        },
        handleConnectionRequest: (state, action) => {
            state.posts.data = action?.payload?.data
        },
        handleCleanUpPost: (state) => {
            state.posts.data = null
        },
        handleReportPostId: (state, action) => {
            state.report.postId = action?.payload?.postId
        }



    },

    extraReducers: (builder) => {

        builder
            .addCase(fetchAllposts.pending, () => {
                // state.posts.loading=true
            })
            .addCase(fetchAllposts.fulfilled, (state, action) => {
                if (action.payload.status === 'ok') {
                    state.posts.loading = false;
                    state.posts.data = action?.payload?.data?.posts
                    state.posts.likes = action?.payload?.data?.likes
                }

            })
            .addCase(fetchAllposts.rejected, (state) => {
                state.posts.loading = false
            })

            .addCase(createPostAction.fulfilled, (state) => {
                state.createPostModal.isOpen = false
            })
            .addCase(editPostAction.fulfilled, (state) => {
                state.editPostModal.isOpen = false
            })
            .addCase(fetchAllCommentsOfPost.fulfilled, (state, action) => {
                state.comments.data = action?.payload?.data
            })
            .addCase(fetchUsersPost.fulfilled, (state, action) => {
                if (action.payload.status === 'ok') {
                    state.posts.loading = false;
                    state.posts.data = action?.payload?.data?.posts
                    state.posts.likes = action?.payload?.data?.likes
                }
            })
            .addCase(fetchUsersLikedPosts.fulfilled, (state, action) => {
                state.likedPosts.data = action?.payload?.data?.posts
                state.likedPosts.likes = action?.payload?.data?.likes

            })
            .addCase(fetchUsersLikedPosts.rejected, (state, action) => {


            })
            .addCase(fetchAllStories.fulfilled, (state, action) => {

                state.stories.data = action?.payload?.data
            })

    }
})


export const {
    handleCreatePostModal,
    handleEditPostModal,
    handleCommentModal,
    handleCommentsData,
    handleCommentsIsEditing,
    handleCommentDeleteReducer,
    handleConnectionRequest,
    handleCleanUpPost,
    handleReportPostId,
} = postSlice.actions;

export default postSlice.reducer;    