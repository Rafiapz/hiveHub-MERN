import { ILikesDependencies } from "../../../application/interface/likes/IDependencies"
import { INotificationsDependencies } from "../../../application/interface/notifications/IDependencies"
import { fetchMyLikesController } from "./fetchMyLikes"
import { fetchPostLikedUsersController } from "./fetchPostLikedUsers"
import { likePostController } from "./likePost"


export const controllers = (dependencies: ILikesDependencies, notificationsDependencies: INotificationsDependencies) => {

    return {

        likePost: likePostController(dependencies, notificationsDependencies),
        fetchMylikes: fetchMyLikesController(dependencies),
        fetchPostLikedUsers: fetchPostLikedUsersController(dependencies)
    }
}