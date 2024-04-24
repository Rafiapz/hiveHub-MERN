
import { Router } from 'express'
import { controllers } from '../controllers/reports'
import { currentUser } from '../middlewares/currentUser'
import { IReportsDependencies } from '../../application/interface/reports/IDependencies'



export const reportsRoutes = (dependencies: IReportsDependencies) => {

    const {
        reportPost,
        fetchAllReports,
        resolveReport,
        rejectReport
    } = controllers(dependencies);

    const router = Router()


    router.route('/report-post').post(currentUser, reportPost)

    router.route('/fetch-all-reports').get(currentUser, fetchAllReports)

    router.route('/resolve-report/:id').delete(currentUser, resolveReport)

    router.route('/reject-report/:id').put(currentUser, rejectReport)




    return router
}