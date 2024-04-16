

import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface IAdminDependencies {

    adminRepositories: IRepositories;
    adminUseCases: IUseCases;

}