import { LikesEntity } from "../../../domain/entities"
import { ILikesDependencies } from "../../interface/likes/IDependencies"

export const likePostUseCase = (dependencies: ILikesDependencies) => {

    const { likesRepositories: { createLike } } = dependencies

    return {

        execute: async (data: LikesEntity) => {
            try {
                return await createLike(data)
            } catch (error: any) {
                throw new Error(error.message)
            }

        }
    }
}