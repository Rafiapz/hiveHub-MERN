import { NotificationsEntity } from "../../entities/notificationsEntity";

export interface IFIndAllNotificationsUseCase {
    execute: (data: any) => Promise<NotificationsEntity[] | []>
}