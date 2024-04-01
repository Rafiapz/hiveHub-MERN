import { IConnectionRequestUseCase } from "../../../domain/useCase/networks/IConnectionRequestUseCase";
import { IDeleteOneUseCase } from "../../../domain/useCase/networks/IDeleteOneUseCase";
import { IFinAllNetworksUseCase } from "../../../domain/useCase/networks/IFindAllNetworksUseCase";
import { IFindFollowersUseCase } from "../../../domain/useCase/networks/IFindFollowersUseCase";
import { IFindFollowingUseCase } from "../../../domain/useCase/networks/IFindFollowingUseCase";
import { ISearchUserUseCase } from "../../../domain/useCase/networks/ISearchUserUseCase";

export interface IUseCases {
    connectionRequestUseCase: (dependencies: any) => IConnectionRequestUseCase;
    findAllNetworksUseCase: (dependencies: any) => IFinAllNetworksUseCase;
    findFollowingUseCase: (dependencies: any) => IFindFollowingUseCase;
    findFollowersUseCase: (dependencies: any) => IFindFollowersUseCase;
    deleteOneUseCase: (dependecies: any) => IDeleteOneUseCase;
    searchUserUseCase: (dependencies: any) => ISearchUserUseCase;
}