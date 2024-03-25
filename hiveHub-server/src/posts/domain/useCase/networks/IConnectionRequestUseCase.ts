import { NetworksEntity } from "../../entities";

export interface IConnectionRequestUseCase{

    execute:(data:NetworksEntity)=>Promise<NetworksEntity|null>
}