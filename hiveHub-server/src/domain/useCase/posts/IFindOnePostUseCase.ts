import { PostEntity } from "../../entities";

export interface IFindOneUseCase {
    execute: (id: any) => Promise<PostEntity | null>
}