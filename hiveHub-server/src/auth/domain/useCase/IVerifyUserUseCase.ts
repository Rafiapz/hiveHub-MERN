import {UserEntity} from '../../domain/entities'

export interface IVerifyUserUseCase{

    execute(data:UserEntity):Promise<UserEntity|null>;
}