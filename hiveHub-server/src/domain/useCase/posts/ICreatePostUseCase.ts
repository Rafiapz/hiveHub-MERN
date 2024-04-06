import { PostEntity } from "../../entities";

export interface ICreatePostUseCase {

    execute: (data: PostEntity) => Promise<PostEntity | null>
}