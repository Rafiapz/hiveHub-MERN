import { UserEntity } from "../../entities";

export interface IUpdateOneUserUseCase {

    execute(query: { email: string }, data: any): Promise<UserEntity | null>;
}