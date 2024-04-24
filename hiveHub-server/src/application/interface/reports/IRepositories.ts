import { ReportsEntity } from "../../../domain/entities";

export interface IRepositories {

    createReport: (data: ReportsEntity) => Promise<ReportsEntity | null>;
    findAllReports: () => any;
    resolveReport: (reportId: any, postId: any) => any;
    rejectReport: (reportId: any) => Promise<ReportsEntity | null>
}