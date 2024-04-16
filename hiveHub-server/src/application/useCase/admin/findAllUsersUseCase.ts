import { IAdminDependencies } from "../../interface/admin/IDependencies";

export const findAllUsersUseCase = (dependencies: IAdminDependencies) => {

    const { adminRepositories: { findAllUsers } } = dependencies

    return {

        execute: async (id: any) => {

            try {

                return await findAllUsers(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}