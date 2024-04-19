import { UserEntity } from "../../entities";

export interface IFindOneUserByIdUseCase {

    execute: (id: any) => Promise<UserEntity | null>
}