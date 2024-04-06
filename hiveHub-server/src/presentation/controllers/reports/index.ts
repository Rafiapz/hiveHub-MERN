import { IPostDependencies } from "../../../application/interface/posts/IDependencies"
import { IReportsDependencies } from "../../../application/interface/reports/IDependencies"
import { reportPostController } from "./reportPost"

export const controllers = (dependencies: IReportsDependencies) => {

    return {

        reportPost: reportPostController(dependencies)
    }
}