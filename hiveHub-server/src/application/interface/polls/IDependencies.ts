import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface IPollsDependencies {

    pollsRepositories: IRepositories;
    pollsUseCases: IUseCases
}