import { PollsEntity } from "../../../domain/entities/pollsEntity";
import { IPollsDependencies } from "../../interface/polls/IDependencies";

export const updatePollUseCase = (dependencies: IPollsDependencies) => {

    const { pollsRepositories: { updatePoll } } = dependencies


    return {

        execute: async (data: any) => {

            try {

                return await updatePoll(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}