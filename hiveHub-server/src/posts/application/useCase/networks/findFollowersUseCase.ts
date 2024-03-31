import { INetworkDependencies } from "../../interface/network/IDependencies";

export const findFollowersUseCase = (dependencies: INetworkDependencies) => {

    const { connectionRepositories: { findFollowers } } = dependencies

    return {

        execute: async (userId: any) => {
            try {

                return await findFollowers(userId)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}