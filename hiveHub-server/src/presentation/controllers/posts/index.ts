import { IPostDependencies } from "../../../application/interface/posts/IDependencies"
import { createPostController } from "./createPostController"
import { fetchAllposts } from "./fetchAllposts"
import { deletePostController } from './deletePost'
import { editPostController } from "./editPost"
import { findUsersPostController } from "./findUsersPost"
import { repostController } from "./repostController"


export const controllers = (dependencies: IPostDependencies) => {

    return {
        createPost: createPostController(dependencies),
        fetchAllPosts: fetchAllposts(dependencies),
        deletePost: deletePostController(dependencies),
        editPost: editPostController(dependencies),
        findUsersPost: findUsersPostController(dependencies),
        repost: repostController(dependencies)

    }
}