import { ReportsEntity } from "../../../../domain/entities";
import Reports from "../../models/reportsModel";

export const createReport = async (data: ReportsEntity) => {

    try {


        const report = await Reports.create(data)


        return report

    } catch (error: any) {
        console.log(error);

        throw new Error(error.message)
    }
}