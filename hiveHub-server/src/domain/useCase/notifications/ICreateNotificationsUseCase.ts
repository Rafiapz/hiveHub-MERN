import { NotificationsEntity } from "../../entities/notificationsEntity";

export interface ICreateNotificationsUseCase {
    execute: (data: NotificationsEntity) => any
}