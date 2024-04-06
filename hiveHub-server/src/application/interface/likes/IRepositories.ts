import { LikesEntity } from "../../../domain/entities";

export interface IRepositories {

    createLike: (data: LikesEntity) => any;

}