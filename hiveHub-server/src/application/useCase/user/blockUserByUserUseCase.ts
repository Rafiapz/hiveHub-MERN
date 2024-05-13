import { IDependencies } from "../../interface/user/IDependencies";

export const blockUserByUserUseCase = (dependencies: IDependencies) => {

    const { repositories: { blockUserByUser } } = dependencies

    return {

        execute: async (data: any) => {
            try {

                return await blockUserByUser(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}

export const unblockUserByUserUseCase = (dependencies: IDependencies) => {

    const { repositories: { unblockUserByUser } } = dependencies

    return {

        execute: async (data: any) => {

            try {

                return await unblockUserByUser(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}