import { IConnectionRequestUseCase } from "../../../domain/useCase/networks/IConnectionRequestUseCase";
import { IFinAllNetworksUseCase } from "../../../domain/useCase/networks/IFindAllNetworksUseCase";

export interface IUseCases {
    connectionRequestUseCase: (dependencies: any) => IConnectionRequestUseCase;
    findAllNetworksUseCase: (dependencies: any) => IFinAllNetworksUseCase
}