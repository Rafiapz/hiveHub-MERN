import { UserEntity } from "../../../domain/entities";



export interface IRepositories {

    findAllUsers: (id: any) => any,
    blockUnblockUser: (userId: any, toStatus: boolean) => Promise<UserEntity | null>

}