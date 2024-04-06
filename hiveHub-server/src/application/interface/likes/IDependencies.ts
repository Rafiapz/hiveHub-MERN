import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface ILikesDependencies {

    likesRepositories: IRepositories;
    likesUseCases: IUseCases
}