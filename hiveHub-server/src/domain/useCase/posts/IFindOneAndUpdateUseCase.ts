import { PostEntity } from "../../entities";

export interface IFindOneAndUpdateUseCase {
    execute: (postId: any) => Promise<PostEntity | null>
}