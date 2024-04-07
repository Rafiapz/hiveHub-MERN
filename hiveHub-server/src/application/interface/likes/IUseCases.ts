import { ICreateLikeUseCase, IFindUsersLikesUseCase } from "../../../domain/useCase/likes";

export interface IUseCases {

    likePostUseCase: (dependencies: any) => ICreateLikeUseCase;
    findUsersLikesUseCase: (dependencies: any) => IFindUsersLikesUseCase

}