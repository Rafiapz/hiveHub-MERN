import { NetworksEntity } from "../../entities";

export interface IFindFollowersUseCase {

    execute: (userId: any) => Promise<NetworksEntity[] | []>
}