import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface INetworkDependencies {

    networkRepositories: IRepositories;
    networkUseCases: IUseCases
}