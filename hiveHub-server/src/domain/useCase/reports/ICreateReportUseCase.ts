import { ReportsEntity } from "../../entities";

export interface ICreateReportUseCase {

    execute: (data: ReportsEntity) => Promise<ReportsEntity | null>
}