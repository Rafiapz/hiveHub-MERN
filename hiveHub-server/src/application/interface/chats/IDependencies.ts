
import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface IChatsDependencies {

    chatsRepositories: IRepositories;
    chatsUseCases: IUseCases;

}