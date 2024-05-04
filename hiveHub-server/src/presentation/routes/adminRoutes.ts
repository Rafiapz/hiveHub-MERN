
import { Router } from 'express'
import { controllers } from '../controllers/admin'
import { currentUser } from '../middlewares/currentUser'
import { IAdminDependencies } from '../../application/interface/admin/IDependencies';
import { getOnlineUsersController } from '../controllers/admin/getOnlineUsers';

export const adminRoutes = (dependencies: IAdminDependencies) => {

    const {
        findAllUsers,
        blockUnblockUser
    } = controllers(dependencies);

    const router = Router()

    router.route('/find-all-users/:id').get(currentUser, findAllUsers)

    router.route('/block-unblock-user').put(currentUser, blockUnblockUser)

    router.route('/get-online-users').get(currentUser, getOnlineUsersController)



    return router
}