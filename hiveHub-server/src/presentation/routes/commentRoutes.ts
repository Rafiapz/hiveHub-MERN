import { Router } from 'express'
import { controllers } from '../controllers/comments'
import { currentUser } from '../middlewares/currentUser'
import { ICommentsDependencies } from '../../application/interface/comments/IDependencies'

export const commentsRoutes = (dependencies: ICommentsDependencies) => {

    const {

        fetchAllComments,
        createComment,
        deleteComment,
        updateComment,
    } = controllers(dependencies);

    const router = Router()


    router.route('/fetch-all-comments/:postId').get(fetchAllComments)

    router.route('/post-comment/:postId').post(currentUser, createComment)

    router.route('/delete-comment/:commentId').delete(deleteComment)

    router.route('/edit-comment/:commentId').put(updateComment)


    return router
}