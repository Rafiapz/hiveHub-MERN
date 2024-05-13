import { UserEntity } from "../../../domain/entities";

export interface IRepositories {
    create: (data: UserEntity) => Promise<UserEntity | null>;
    verify: (data: { email: string, otp: string }) => Promise<UserEntity | null>;
    findOne: (data: { email: string }) => Promise<UserEntity | null>;
    updateOne: (query: { email: string }, data: any) => Promise<UserEntity | null>;
    updateUserById: (id: any, data: any) => Promise<UserEntity | null>;
    findAllUsers: (userId: any) => Promise<UserEntity[] | []>;
    findOneUserById: (id: any) => Promise<UserEntity | null>;
    blockUserByUser: (data: any) => Promise<UserEntity | null>;
    unblockUserByUser:(data:any)=>Promise<UserEntity|null>

}