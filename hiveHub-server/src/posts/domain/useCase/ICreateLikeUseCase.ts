import { DeleteResult } from "mongodb";
import { LikesEntity, PostEntity } from "../entities";

export interface ICreateLikeUseCase{
    execute:(data:LikesEntity)=>any
}