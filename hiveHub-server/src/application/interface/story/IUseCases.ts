import { ICreateStoryUseCase, IDeleteStoryUseCase, IFindAllStoriesUseCase } from "../../../domain/useCase/story";

export interface IUseCases {
    createStoryUseCase: (dependencies: any) => ICreateStoryUseCase;
    findAllStoryUseCase: (dependencies: any) => IFindAllStoriesUseCase;
    deleteStoryUseCase: (dependencies: any) => IDeleteStoryUseCase;
}