import { Router } from 'express'
import { controllers } from '../controllers/networks/'
import { currentUser } from '../middlewares/currentUser'
import { INetworkDependencies } from '../../application/interface/network/IDependencies'



export const networksRoutes = (dependencies: INetworkDependencies) => {

    const { connectionRequest, fetchAllNetworks, fetchFollowing, fetchFollowers, unfollow, searchUser } = controllers(dependencies)

    const router = Router()

    router.route('/connection-request/:id').post(currentUser, connectionRequest)

    router.route('/fetch-all-networks').get(currentUser, fetchAllNetworks)

    router.route('/fetch-following').get(currentUser, fetchFollowing)

    router.route('/fetch-followers').get(currentUser, fetchFollowers)

    router.route('/unfollow/:id').delete(currentUser, unfollow)

    router.route('/search-user').get(currentUser, searchUser)





    return router
}