
import {Router} from 'express'
import { controllers } from '../controllers'
import { IPostDependencies } from '../../application/interface/IDependencies'
import { upload, uploadSingleFile } from '../../../_lib/multer'
import { auth } from '../../../auth/presentation/controllers/isAuthorized'



export const postRoutes=(dependencies:IPostDependencies)=>{    
        
    const {createPost,fetchAllPosts,deletePost,editPost}=controllers(dependencies)

    const router=Router()

    router.route('/create-post/:type').post(uploadSingleFile,createPost)

    router.route('/fetch-all-posts').get(fetchAllPosts)

    router.route('/delete-post').delete(deletePost)

    router.route('/edit-post/:type').put(uploadSingleFile,editPost)

    router.route('/like-post').post()

    

    

    return router
}