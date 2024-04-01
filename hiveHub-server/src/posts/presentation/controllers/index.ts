import { IPostDependencies } from "../../application/interface/IDependencies"
import { createPostController } from "./createPostController"
import { fetchAllposts } from "./fetchAllposts"
import { deletePostController } from './deletePost'
import { editPostController } from "./editPost"
import { likePostController } from "./likePost"
import { fetChAllCommentsController } from './fetchAllComments'
import { createCommentController } from "./createComment"
import { deleteCommentController } from "./deleteComment"
import { findUsersPostController } from "./findUsersPost"
import { updateCommentController } from "./editComment"
import { reportPostController } from "./reportPost"

export const controllers = (dependencies: IPostDependencies) => {

    return {
        createPost: createPostController(dependencies),
        fetchAllPosts: fetchAllposts(dependencies),
        deletePost: deletePostController(dependencies),
        editPost: editPostController(dependencies),
        likePost: likePostController(dependencies),
        fetchAllComments: fetChAllCommentsController(dependencies),
        createComment: createCommentController(dependencies),
        deleteComment: deleteCommentController(dependencies),
        findUsersPost: findUsersPostController(dependencies),
        updateComment: updateCommentController(dependencies),
        reportPost: reportPostController(dependencies)
    }
}