import { INetworkDependencies } from "../../../application/interface/network/IDependencies"
import { INotificationsDependencies } from "../../../application/interface/notifications/IDependencies"
import { coneectionRequestController } from "./connectionRequest"
import { fetchAllNetworksController } from "./fetchAllnetworks"
import { fetchFollowersController } from "./fetchFollowers"
import { fetchFollowingController } from "./fetchFollowing"
import { searchUserController } from "./searchUser"
import { unfollowController } from "./unfollow"

export const controllers = (dependencies: INetworkDependencies, notificationDependencies: INotificationsDependencies) => {

    return {
        connectionRequest: coneectionRequestController(dependencies, notificationDependencies),
        fetchAllNetworks: fetchAllNetworksController(dependencies),
        fetchFollowing: fetchFollowingController(dependencies),
        fetchFollowers: fetchFollowersController(dependencies),
        unfollow: unfollowController(dependencies),
        searchUser: searchUserController(dependencies)
    }
}