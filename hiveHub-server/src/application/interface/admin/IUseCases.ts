import { IBlockUnblockUserUseCase, IFindAllUsersUseCase } from "../../../domain/useCase/admin";

export interface IUseCases {

    findAllUsersUseCase: (dependencies: any) => IFindAllUsersUseCase,
    blockUnblockUserUseCase: (dependencies: any) => IBlockUnblockUserUseCase
}