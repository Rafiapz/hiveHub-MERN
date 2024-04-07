import { ILikesDependencies } from "../../../application/interface/likes/IDependencies"
import { fetchMyLikesController } from "./fetchMyLikes"
import { likePostController } from "./likePost"


export const controllers = (dependencies: ILikesDependencies) => {

    return {

        likePost: likePostController(dependencies),
        fetchMylikes: fetchMyLikesController(dependencies)

    }
}