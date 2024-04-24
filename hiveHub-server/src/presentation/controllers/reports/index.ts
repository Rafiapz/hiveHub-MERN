import { IPostDependencies } from "../../../application/interface/posts/IDependencies"
import { IReportsDependencies } from "../../../application/interface/reports/IDependencies"
import { fetchAllReportsController } from "./fetchAllReports"
import { rejectReportController } from "./rejectReport"
import { reportPostController } from "./reportPost"
import { resolveReportController } from "./resolveReport"

export const controllers = (dependencies: IReportsDependencies) => {

    return {

        reportPost: reportPostController(dependencies),
        fetchAllReports: fetchAllReportsController(dependencies),
        resolveReport: resolveReportController(dependencies),
        rejectReport: rejectReportController(dependencies)
    }
}