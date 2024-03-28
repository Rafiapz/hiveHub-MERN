import { ICreateUserUseCase, IFindAllUsersUseCase, IFindOneUserUseCase, IUpdateUserByIdUseCase } from "../../domain/useCase";
import { IVerifyUserUseCase } from "../../domain/useCase";
import { IUpdateOneUserUseCase } from "../../domain/useCase/IUpdateOneUserUseCase";

export interface IUseCases{
    createUserUseCase:(dependencies:any)=>ICreateUserUseCase;
    verifyUserUseCase:(dependencies:any)=>IVerifyUserUseCase;
    findOneUserUseCase:(dependencies:any)=>IFindOneUserUseCase;
    updateOneUserUseCase:(dependencies:any)=>IUpdateOneUserUseCase;
    updateUserByIdUseCase:(dependencies:any)=>IUpdateUserByIdUseCase;
    findAllUsersUseCase:(dependencies:any)=>IFindAllUsersUseCase
}