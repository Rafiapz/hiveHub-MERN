import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface ICommentsDependencies {

    commentsRepositories: IRepositories;
    commentsUseCases: IUseCases
}