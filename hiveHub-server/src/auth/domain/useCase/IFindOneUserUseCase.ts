import {UserEntity} from '../../domain/entities'

export interface IFindOneUserUseCase{

    execute(data:{email:string}):Promise<UserEntity|null>;
}