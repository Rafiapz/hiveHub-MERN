import { PollsEntity } from "../../entities/pollsEntity";

export interface IVotePollUseCase {
    execute: (data: any) => Promise<PollsEntity | null>
}