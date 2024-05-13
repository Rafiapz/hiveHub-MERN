import { PollsEntity } from "../../entities/pollsEntity";

export interface ICreatePollUseCase {
    execute: (data: PollsEntity) => Promise<PollsEntity | null>
}