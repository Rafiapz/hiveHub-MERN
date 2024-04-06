import { PostEntity } from "../../entities";

export interface IUPdatePostUseCase {

    execute: (data: PostEntity) => Promise<PostEntity | null>
}