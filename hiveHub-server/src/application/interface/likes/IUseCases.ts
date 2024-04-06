import { ICreateLikeUseCase } from "../../../domain/useCase/likes";

export interface IUseCases {

    likePostUseCase: (dependencies: any) => ICreateLikeUseCase;

}