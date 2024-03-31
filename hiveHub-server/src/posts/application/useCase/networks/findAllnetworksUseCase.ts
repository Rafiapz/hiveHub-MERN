import { INetworkDependencies } from "../../interface/network/IDependencies";

export const findAllNetworksUseCase = (dependencies: INetworkDependencies) => {

    const { connectionRepositories: { findAllNetworks } } = dependencies

    return {

        execute: async (userId: any) => {

            try {

                return await findAllNetworks(userId)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}