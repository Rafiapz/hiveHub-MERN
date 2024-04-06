import { DeleteResult } from "mongodb";
import { NetworksEntity } from "../../../domain/entities";
import { UserEntity } from "../../../domain/entities";

export interface IRepositories {

    connectionRequest: (data: NetworksEntity) => Promise<NetworksEntity | null>;
    findAllNetworks: (userId: any) => any;
    findFollowing: (userId: any) => Promise<NetworksEntity[] | []>;
    findFollowers: (userId: any) => Promise<NetworksEntity[] | []>;
    deleteOne: (id: any) => Promise<DeleteResult | null>;
    searchUser: (query: string) => Promise<UserEntity[] | []>
}