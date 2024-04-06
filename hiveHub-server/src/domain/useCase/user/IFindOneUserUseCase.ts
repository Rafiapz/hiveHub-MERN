import { UserEntity } from "../../entities";
export interface IFindOneUserUseCase {

    execute(data: { email: string }): Promise<UserEntity | null>;
}