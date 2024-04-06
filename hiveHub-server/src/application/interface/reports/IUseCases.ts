import { ICreateReportUseCase } from "../../../domain/useCase/reports";

export interface IUseCases {

    createReportUseCase: (dependencies: any) => ICreateReportUseCase;
}