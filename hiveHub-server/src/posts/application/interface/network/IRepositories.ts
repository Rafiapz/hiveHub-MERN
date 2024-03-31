import { NetworksEntity } from "../../../domain/entities";

export interface IRepositories {

    connectionRequest: (data: NetworksEntity) => Promise<NetworksEntity | null>;
    findAllNetworks: (userId: any) => any
}