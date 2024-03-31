import { INetworkDependencies } from "../../../application/interface/network/IDependencies"
import { coneectionRequestController } from "./connectionRequest"
import { fetchAllNetworksController } from "./fetchAllnetworks"
import { fetchFollowersController } from "./fetchFollowers"
import { fetchFollowingController } from "./fetchFollowing"
import { unfollowController } from "./unfollow"

export const controllers = (dependencies: INetworkDependencies) => {

    return {
        connectionRequest: coneectionRequestController(dependencies),
        fetchAllNetworks: fetchAllNetworksController(dependencies),
        fetchFollowing: fetchFollowingController(dependencies),
        fetchFollowers: fetchFollowersController(dependencies),
        unfollow:unfollowController(dependencies)
    }
}