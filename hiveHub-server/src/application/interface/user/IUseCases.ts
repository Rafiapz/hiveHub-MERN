import { IBlockUserByUserUseCase, ICreateUserUseCase, IFindAllUsersUseCase, IFindOneUserByIdUseCase, IFindOneUserUseCase, IUnblockUserByUserUseCase, IUpdateUserByIdUseCase } from "../../../domain/useCase/user";
import { IVerifyUserUseCase } from "../../../domain/useCase/user";
import { IUpdateOneUserUseCase } from "../../../domain/useCase/user";

export interface IUseCases {
    createUserUseCase: (dependencies: any) => ICreateUserUseCase;
    verifyUserUseCase: (dependencies: any) => IVerifyUserUseCase;
    findOneUserUseCase: (dependencies: any) => IFindOneUserUseCase;
    updateOneUserUseCase: (dependencies: any) => IUpdateOneUserUseCase;
    updateUserByIdUseCase: (dependencies: any) => IUpdateUserByIdUseCase;
    findAllUsersUseCase: (dependencies: any) => IFindAllUsersUseCase;
    findOneUserByIdUseCase: (dependencies: any) => IFindOneUserByIdUseCase;
    blockUserByUserUseCase: (dependencies: any) => IBlockUserByUserUseCase;
    unblockUserByUserUseCase: (dependencies: any) => IUnblockUserByUserUseCase
}