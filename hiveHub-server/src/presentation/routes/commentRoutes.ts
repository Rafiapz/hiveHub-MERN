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
        createReplyComment,
        fetchAllReplies,
        deleteReplyComment
    } = controllers(dependencies);

    const router = Router()


    router.route('/fetch-all-comments/:postId').get(fetchAllComments)

    router.route('/post-comment/:postId').post(currentUser, createComment)

    router.route('/delete-comment/:commentId').delete(currentUser, deleteComment)

    router.route('/edit-comment/:commentId').put(currentUser, updateComment)

    router.route('/create-reply-comment').post(currentUser, createReplyComment)

    router.route('/fetch-all-replies/:commentId').get(currentUser, fetchAllReplies)

    router.route('/delete-reply-comment/:id').delete(currentUser, deleteReplyComment)


    return router
}