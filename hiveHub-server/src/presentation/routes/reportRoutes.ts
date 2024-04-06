
import { Router } from 'express'
import { controllers } from '../controllers/reports'
import { currentUser } from '../middlewares/currentUser'
import { IReportsDependencies } from '../../application/interface/reports/IDependencies'



export const reportsRoutes = (dependencies: IReportsDependencies) => {

    const {
        reportPost
    } = controllers(dependencies);

    const router = Router()


    router.route('/report-post').post(currentUser, reportPost)




    return router
}