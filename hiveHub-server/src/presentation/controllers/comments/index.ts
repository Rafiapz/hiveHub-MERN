import { fetChAllCommentsController } from './fetchAllComments'
import { createCommentController } from "./createComment"
import { deleteCommentController } from "./deleteComment"
import { updateCommentController } from "./editComment"
import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies"


export const controllers = (dependencies: ICommentsDependencies) => {

    return {

        fetchAllComments: fetChAllCommentsController(dependencies),
        createComment: createCommentController(dependencies),
        deleteComment: deleteCommentController(dependencies),
        updateComment: updateCommentController(dependencies),

    }
}