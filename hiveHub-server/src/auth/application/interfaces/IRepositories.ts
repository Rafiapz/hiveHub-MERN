import {UserEntity} from '../../domain/entities/userEntity'

export interface IRepositories{
    create:(data:UserEntity)=>Promise<UserEntity|null>;
    verify:(data:{email:string,otp:string})=>Promise<UserEntity|null>;
    findOne:(data:{email:string})=>Promise<UserEntity|null>;
    updateOne:(query:{email:string},data:any)=>Promise<UserEntity|null>;
    updateUserById:(id:any,data:any)=>Promise<UserEntity|null>;
    findAllUsers:()=>Promise<UserEntity[]|[]>
 
}