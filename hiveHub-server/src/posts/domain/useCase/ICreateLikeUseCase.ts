import { LikesEntity } from "../entities";

export interface ICreateLikeUseCase{
    execute:(data:LikesEntity)=>Promise<LikesEntity|null>
}