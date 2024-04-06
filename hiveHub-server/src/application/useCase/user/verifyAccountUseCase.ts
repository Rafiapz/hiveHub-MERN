import { IDependencies } from "../../interface/user/IDependencies"

export const verifyUserUseCase = (dependencies: IDependencies) => {

    const { repositories: { verify } } = dependencies

    return {
        execute: async (data: any) => {
            try {
                return await verify(data)
            } catch (error: any) {
                throw new Error(error.message || 'user creation failled')
            }
        }
    }
}