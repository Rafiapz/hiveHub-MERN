import { PollsEntity } from "../../../domain/entities/pollsEntity";
import { IPollsDependencies } from "../../interface/polls/IDependencies";

export const createPollUseCase = (dependencies: IPollsDependencies) => {

    const { pollsRepositories: { createPoll } } = dependencies

    return {

        execute: async (data: PollsEntity) => {

            try {

                return await createPoll(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}