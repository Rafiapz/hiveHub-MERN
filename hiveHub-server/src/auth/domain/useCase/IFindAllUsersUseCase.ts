import { UserEntity } from "../entities";

export interface IFindAllUsersUseCase{
    execute:()=>Promise<UserEntity[]|[]>
}