import { UserEntity } from "../../entities";

export interface IBlockUnblockUserUseCase {

    execute: (userId: any, toStatus: boolean) => Promise<UserEntity | null>
}