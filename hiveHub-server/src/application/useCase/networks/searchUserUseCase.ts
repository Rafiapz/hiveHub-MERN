import { INetworkDependencies } from "../../interface/network/IDependencies";

export const searchUserUseCase = (dependencies: INetworkDependencies) => {

    const { networkRepositories: { searchUser } } = dependencies

    return {

        execute: async (query: string) => {

            try {

                return await searchUser(query)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}