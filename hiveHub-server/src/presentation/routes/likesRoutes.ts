
import { Router } from 'express'
import { controllers } from '../controllers/likes'
import { currentUser } from '../middlewares/currentUser'
import { ILikesDependencies } from '../../application/interface/likes/IDependencies'



export const likesRoutes = (dependencies: ILikesDependencies) => {

    const {

        likePost,

    } = controllers(dependencies);

    const router = Router()


    router.route('/like-post/:postId').post(currentUser, likePost)





    return router
}