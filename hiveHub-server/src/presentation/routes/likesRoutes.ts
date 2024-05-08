
import { Router } from 'express'
import { controllers } from '../controllers/likes'
import { currentUser } from '../middlewares/currentUser'
import { ILikesDependencies } from '../../application/interface/likes/IDependencies'
import { INotificationsDependencies } from '../../application/interface/notifications/IDependencies'



export const likesRoutes = (dependencies: ILikesDependencies, notificationsDependencies: INotificationsDependencies) => {

    const {
        likePost,
        fetchMylikes,
        fetchPostLikedUsers
    } = controllers(dependencies, notificationsDependencies);

    const router = Router()


    router.route('/like-post/:postId').post(currentUser, likePost)

    router.route('/fetch-my-likes').get(currentUser, fetchMylikes)

    router.route('/fetch-post-liked-users').get(currentUser, fetchPostLikedUsers)





    return router
}