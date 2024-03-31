import { NetworksEntity } from "../../entities";

export interface IFinAllNetworksUseCase {

    execute: (userId: any) => Promise<NetworksEntity[] | []>
}