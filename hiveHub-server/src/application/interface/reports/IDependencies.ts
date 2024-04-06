import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface IReportsDependencies {

    reportsRepositories: IRepositories;
    reportsUseCases: IUseCases
}