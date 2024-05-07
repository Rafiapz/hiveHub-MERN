
import { Router } from 'express'
import { controllers } from '../controllers/notifications'
import { INotificationsDependencies } from '../../application/interface/notifications/IDependencies';


export const notificationsRoutes = (dependencies: INotificationsDependencies) => {

    const {
        fetchNotifications,
        deleteNotification
    } = controllers(dependencies);

    const router = Router()

    router.route('/fetch-notifications/:id').get(fetchNotifications)

    router.route('/delete-notification').delete(deleteNotification)

    return router
}