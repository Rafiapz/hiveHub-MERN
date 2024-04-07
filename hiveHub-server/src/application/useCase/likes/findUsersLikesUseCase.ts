import { ILikesDependencies } from "../../interface/likes/IDependencies";

export const findUsersLikesUseCase = (dependencies: ILikesDependencies) => {

    const { likesRepositories: { findByUserId } } = dependencies

    return {

        execute: async (userId: any) => {

            try {

                return await findByUserId(userId)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}