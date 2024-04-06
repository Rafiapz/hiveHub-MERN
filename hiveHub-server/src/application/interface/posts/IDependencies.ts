import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface IPostDependencies{

    postRepositories:IRepositories;
    postUseCases:IUseCases
}