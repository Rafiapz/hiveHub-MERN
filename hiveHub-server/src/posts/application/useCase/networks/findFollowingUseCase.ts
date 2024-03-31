import { INetworkDependencies } from "../../interface/network/IDependencies";

export const findFollowingUseCase = (dependencies: INetworkDependencies) => {

    const { connectionRepositories: { findFollowing } } = dependencies

    return {

        execute: async (userId: any) => {
            try {

                return await findFollowing(userId)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}