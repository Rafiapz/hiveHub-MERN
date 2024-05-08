
import { Router } from 'express'
import { controllers } from '../controllers/notifications'
import { INotificationsDependencies } from '../../application/interface/notifications/IDependencies';
import { currentUser } from '../middlewares/currentUser';


export const notificationsRoutes = (dependencies: INotificationsDependencies) => {

    const {
        fetchNotifications,
        deleteNotification
    } = controllers(dependencies);

    const router = Router()

    router.route('/fetch-notifications/:id').get(currentUser, fetchNotifications)

    router.route('/delete-notification').delete(currentUser, deleteNotification)

    return router
}