import { ILikesDependencies } from "../../../application/interface/likes/IDependencies"
import { likePostController } from "./likePost"


export const controllers = (dependencies: ILikesDependencies) => {

    return {

        likePost: likePostController(dependencies),

    }
}