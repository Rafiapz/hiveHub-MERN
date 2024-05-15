import { NotificationsEntity } from "../../../domain/entities/notificationsEntity";

export interface IRepositories {

    createNotification: (data: NotificationsEntity) => any
    findAllNotifications: (data: any) => Promise<NotificationsEntity[] | []>;
    deleteNotification: (id: any) => any

}