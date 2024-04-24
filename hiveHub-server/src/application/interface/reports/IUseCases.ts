import { ICreateReportUseCase, IFindAllReportsUseCase, IRejectReportUseCase, IResolveReportUseCase } from "../../../domain/useCase/reports";

export interface IUseCases {

    createReportUseCase: (dependencies: any) => ICreateReportUseCase;
    findAllReportsUseCase: (dependencies: any) => IFindAllReportsUseCase;
    resolveReportUseCase: (dependencies: any) => IResolveReportUseCase;
    rejectReportUseCase: (dependencies: any) => IRejectReportUseCase;
}