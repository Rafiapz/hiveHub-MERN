import { ReportsEntity } from "../../../domain/entities";

export interface IRepositories {

    createReport: (data: ReportsEntity) => Promise<ReportsEntity | null>

}