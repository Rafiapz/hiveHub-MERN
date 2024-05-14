import { NotificationsEntity } from "../../../domain/entities/notificationsEntity";
import { PollsEntity } from "../../../domain/entities/pollsEntity";

export interface IRepositories {

    createPoll: (data: PollsEntity) => Promise<PollsEntity | null>;
    fetchAllPolls: () => Promise<PollsEntity[] | []>;
    pollVote: (data: any) => Promise<PollsEntity | null>;
    deletePoll: (id: any) => any;
    updatePoll: (data: any) => Promise<PollsEntity | null>

}