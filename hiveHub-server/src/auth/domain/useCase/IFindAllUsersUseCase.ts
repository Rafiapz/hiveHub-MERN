import { UserEntity } from "../entities";

export interface IFindAllUsersUseCase {
    execute: (userId: any) => Promise<UserEntity[] | []>
}