import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface INetworkDependencies{

    connectionRepositories:IRepositories;
    connectionUseCases:IUseCases
}