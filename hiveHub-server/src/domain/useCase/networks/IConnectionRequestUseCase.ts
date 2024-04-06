import { NetworksEntity } from "../../entities";

export interface IConnectionRequestUseCase {

    execute: (data: NetworksEntity) => any
}