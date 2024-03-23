
import {Router} from 'express'
import { controllers } from '../controllers'
import { IPostDependencies } from '../../application/interface/IDependencies'
import { upload, uploadSingleFile } from '../../../_lib/multer'
import { auth } from '../../../auth/presentation/controllers/isAuthorized'
import { currentUser } from '../middlewares/currentUser'



export const postRoutes=(dependencies:IPostDependencies)=>{    
        
    const {createPost,fetchAllPosts,deletePost,editPost,likePost}=controllers(dependencies)

    const router=Router()

    router.route('/create-post/:type').post(uploadSingleFile,createPost)

    router.route('/fetch-all-posts').get(currentUser,fetchAllPosts)

    router.route('/delete-post').delete(deletePost)

    router.route('/edit-post/:type').put(uploadSingleFile,editPost)

    router.route('/like-post/:postId').post(currentUser,likePost)

    

    

    return router
}