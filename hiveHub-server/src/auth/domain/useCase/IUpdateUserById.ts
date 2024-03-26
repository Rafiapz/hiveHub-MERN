import {UserEntity} from '../../domain/entities'

export interface IUpdateUserByIdUseCase{

    execute(id:any,data:any):Promise<UserEntity|null>;
}