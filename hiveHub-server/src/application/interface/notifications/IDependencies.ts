import { IRepositories } from "./IRepositories"
import { IUseCases } from "./IUseCases";

export interface INotificationsDependencies {

    notificationsRepositories: IRepositories;
    notificationsUseCases: IUseCases
}