import { UserEntity } from "../../../../auth/domain/entities";

export interface ISearchUserUseCase {

    execute: (query: string) => Promise<UserEntity[] | []>
}