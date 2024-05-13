import { UserEntity } from "../../entities";

export interface IBlockUserByUserUseCase {

    execute: (data: any) => Promise<UserEntity | null>
}

export interface IUnblockUserByUserUseCase {
    execute: (data: any) => Promise<UserEntity | null>
}