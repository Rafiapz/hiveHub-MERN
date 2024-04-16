import { IAdminDependencies } from "../../interface/admin/IDependencies";

export const blockUnblockUserUseCase = (dependencies: IAdminDependencies) => {

    const { adminRepositories: { blockUnblockUser } } = dependencies

    return {

        execute: async (userId: any, toStatus: boolean) => {

            try {

                return await blockUnblockUser(userId, toStatus)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}