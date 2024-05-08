import { LikesEntity } from "../../entities";

export interface IFindLikedUsersUseCase {
    execute: (data: any) => Promise<LikesEntity[] | []>
}