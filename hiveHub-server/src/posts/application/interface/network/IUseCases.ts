import { IConnectionRequestUseCase } from "../../../domain/useCase/networks/IConnectionRequestUseCase";

export interface IUseCases{
    connectionRequestUseCase:(dependencies:any)=>IConnectionRequestUseCase
}