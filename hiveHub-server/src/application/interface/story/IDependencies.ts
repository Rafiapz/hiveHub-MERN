

import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface IStoryDependencies {

    storyRepositories: IRepositories;
    storyUseCases: IUseCases;

}