import { ILikesDependencies } from "../../interface/likes/IDependencies";

export const findLikedUsersUseCase = (dependecies: ILikesDependencies) => {

    const { likesRepositories: { findLikedUsers } } = dependecies

    return {

        execute: async (data: any) => {

            try {

                return await findLikedUsers(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}