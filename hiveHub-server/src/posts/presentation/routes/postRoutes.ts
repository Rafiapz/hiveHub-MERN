
import { Router } from 'express'
import { controllers } from '../controllers'
import { IPostDependencies } from '../../application/interface/IDependencies'
import { upload, uploadSingleFile } from '../../../_lib/multer'
import { auth } from '../../../auth/presentation/controllers/isAuthorized'
import { currentUser } from '../middlewares/currentUser'



export const postRoutes = (dependencies: IPostDependencies) => {

  const {
    createPost,
    fetchAllPosts,
    deletePost,
    editPost,
    likePost,
    fetchAllComments,
    createComment,
    deleteComment,
    findUsersPost,
    updateComment,
    reportPost
  } = controllers(dependencies);

  const router = Router()

  router.route('/create-post/:type').post(uploadSingleFile, createPost)

  router.route('/fetch-all-posts').get(currentUser, fetchAllPosts)

  router.route('/delete-post').delete(deletePost)

  router.route('/edit-post/:type').put(uploadSingleFile, editPost)

  router.route('/like-post/:postId').post(currentUser, likePost)

  router.route('/fetch-all-comments/:postId').get(fetchAllComments)

  router.route('/post-comment/:postId').post(currentUser, createComment)

  router.route('/delete-comment/:commentId').delete(deleteComment)

  router.route('/fetch-users-post/:id').get(findUsersPost)

  router.route('/edit-comment/:commentId').put(updateComment)

  router.route('/report-post').post(currentUser, reportPost)




  return router
}