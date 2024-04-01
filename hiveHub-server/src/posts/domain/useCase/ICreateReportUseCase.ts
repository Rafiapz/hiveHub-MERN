import { ReportsEntity } from "../entities/reportsEntity";

export interface ICreateReportUseCase {

    execute: (data: ReportsEntity) => Promise<ReportsEntity | null>
}