import { fetChAllCommentsController } from './fetchAllComments'
import { createCommentController } from "./createComment"
import { deleteCommentController } from "./deleteComment"
import { updateCommentController } from "./editComment"
import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies"
import { createReplyCommentController } from './createReplyComment'
import { fetchAllRepliesController } from './fetchAllReplies'
import { deleteReplyComment } from '../../../infrastructure/database/repositories/comments'
import { deleteReplyCommentController } from './deleteReplyComment'
import { likeCommentController } from './likeComment'


export const controllers = (dependencies: ICommentsDependencies) => {

    return {

        fetchAllComments: fetChAllCommentsController(dependencies),
        createComment: createCommentController(dependencies),
        deleteComment: deleteCommentController(dependencies),
        updateComment: updateCommentController(dependencies),
        createReplyComment: createReplyCommentController(dependencies),
        fetchAllReplies: fetchAllRepliesController(dependencies),
        deleteReplyComment: deleteReplyCommentController(dependencies),
        likeComment: likeCommentController(dependencies)
    }
}