import { IPollsDependencies } from "../../interface/polls/IDependencies";

export const votePollUseCase = (dependencies: IPollsDependencies) => {

    const { pollsRepositories: { pollVote } } = dependencies

    return {

        execute: async (data: any) => {

            try {

                return await pollVote(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}