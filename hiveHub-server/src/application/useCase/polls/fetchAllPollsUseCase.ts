import { IPollsDependencies } from "../../interface/polls/IDependencies";

export const fetchAllPollsUseCase = (dependencies: IPollsDependencies) => {

    const { pollsRepositories: { fetchAllPolls } } = dependencies

    return {
        execute: async () => {
            try {

                return await fetchAllPolls()

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}