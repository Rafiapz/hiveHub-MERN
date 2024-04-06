
import { Router } from 'express'
import { controllers } from '../controllers/posts/'
import { IPostDependencies } from '../../application/interface/posts/IDependencies'
import { uploadSingleFile } from '../../_lib/multer'
import { currentUser } from '../middlewares/currentUser'



export const postRoutes = (dependencies: IPostDependencies) => {

  const {
    createPost,
    fetchAllPosts,
    deletePost,
    editPost,
    findUsersPost,
  } = controllers(dependencies);

  const router = Router()

  router.route('/create-post/:type').post(uploadSingleFile, createPost)

  router.route('/fetch-all-posts').get(currentUser, fetchAllPosts)

  router.route('/delete-post').delete(deletePost)

  router.route('/edit-post/:type').put(uploadSingleFile, editPost)

  router.route('/fetch-users-post/:id').get(findUsersPost)





  return router
}