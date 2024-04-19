import { IDependencies } from "../../interface/user/IDependencies";

export const findOneUserByIdUseCase = (dependencies: IDependencies) => {

    const { repositories: { findOneUserById } } = dependencies

    return {
        execute: async (id: any) => {

            try {
                return await findOneUserById(id)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}