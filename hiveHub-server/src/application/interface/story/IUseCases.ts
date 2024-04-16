import { ICreateStoryUseCase, IFindAllStoriesUseCase } from "../../../domain/useCase/story";

export interface IUseCases {
    createStoryUseCase: (dependencies: any) => ICreateStoryUseCase;
    findAllStoryUseCase: (dependencies: any) => IFindAllStoriesUseCase;
}