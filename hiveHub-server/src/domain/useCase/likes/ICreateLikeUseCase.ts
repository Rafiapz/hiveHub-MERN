import { LikesEntity } from "../../entities";

export interface ICreateLikeUseCase {
    execute: (data: LikesEntity) => any
}