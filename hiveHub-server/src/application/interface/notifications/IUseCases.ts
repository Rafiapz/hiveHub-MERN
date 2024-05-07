import { ICreateNotificationsUseCase, IDeleteNotificationsUseCase, IFIndAllNotificationsUseCase } from "../../../domain/useCase/notifications";

export interface IUseCases {

    createNotificationUseCase: (dependencies: any) => ICreateNotificationsUseCase;
    findAllNotificationsUseCase: (dependencies: any) => IFIndAllNotificationsUseCase;
    deleteNotificationUseCase: (dependencies: any) => IDeleteNotificationsUseCase
}