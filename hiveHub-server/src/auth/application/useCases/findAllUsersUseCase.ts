import { IDependencies } from "../interfaces/IDependencies";

export const findAllUsersUseCase = (dependencies: IDependencies) => {

    const { repositories: { findAllUsers } } = dependencies

    return {

        execute: async (userId: any) => {
            try {

                return await findAllUsers(userId)

            } catch (error: any) {
                throw new error(error)
            }
        }
    }
}