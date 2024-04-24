import { ReportsEntity } from "../../entities";

export interface IRejectReportUseCase {
    execute: (reportId: any) => Promise<ReportsEntity | null>
}