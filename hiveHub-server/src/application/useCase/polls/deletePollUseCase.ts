import { IPollsDependencies } from "../../interface/polls/IDependencies";

export const deletePollUseCase = (dependencies: IPollsDependencies) => {

    const { pollsRepositories: { deletePoll } } = dependencies

    return {
        execute: async (id: any) => {
            try {

                return await deletePoll(id)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}