import { ICreateStoryUseCase, IDeleteStoryUseCase, IFindAllStoriesUseCase, IFindStoryByIdUseCase } from "../../../domain/useCase/story";

export interface IUseCases {
    createStoryUseCase: (dependencies: any) => ICreateStoryUseCase;
    findAllStoryUseCase: (dependencies: any) => IFindAllStoriesUseCase;
    deleteStoryUseCase: (dependencies: any) => IDeleteStoryUseCase;
    findStoryByIdUseCase: (dependencies: any) => IFindStoryByIdUseCase
}