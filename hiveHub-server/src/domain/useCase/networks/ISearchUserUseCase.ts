import { UserEntity } from "../../entities";

export interface ISearchUserUseCase {

    execute: (query: string) => Promise<UserEntity[] | []>
}