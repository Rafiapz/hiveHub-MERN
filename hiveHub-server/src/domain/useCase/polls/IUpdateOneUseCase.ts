import { PollsEntity } from "../../entities/pollsEntity";

export interface IUpdatePollUseCase {
    execute: (data: any) => Promise<PollsEntity | null>
}