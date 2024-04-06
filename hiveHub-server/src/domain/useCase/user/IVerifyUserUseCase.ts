import { UserEntity } from "../../entities";

export interface IVerifyUserUseCase {

    execute(data: UserEntity): Promise<UserEntity | null>;
}