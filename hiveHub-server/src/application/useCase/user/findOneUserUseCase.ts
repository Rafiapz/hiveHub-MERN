import { IDependencies } from "../../interface/user/IDependencies"

export const findOneUserUseCase = (dependencies: IDependencies) => {

    const { repositories: { findOne } } = dependencies

    return {
        execute: async (data: { email: string }) => {
            return await findOne(data)
        }
    }
}