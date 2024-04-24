import { PostEntity } from "../../entities";

export interface IFindOneUseCase {
    execute: (postId: any) => Promise<PostEntity | null>
}