import { PollsEntity } from "../../entities/pollsEntity";

export interface IFetchAllPollsUseCase {
    execute: () => Promise<PollsEntity[] | []>
}