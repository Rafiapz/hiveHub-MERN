import { NotificationsEntity } from "../../entities/notificationsEntity";

export interface ICreateNotificationsUseCase {
    execute: (data: NotificationsEntity) => Promise<NotificationsEntity | null>
}