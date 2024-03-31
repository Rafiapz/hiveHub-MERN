import { NetworksEntity } from "../../entities";

export interface IFindFollowingUseCase {

    execute: (userId: any) => Promise<NetworksEntity[] | []>
}