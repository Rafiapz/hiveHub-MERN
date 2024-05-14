import { PollsEntity } from "../../../domain/entities/pollsEntity";
import { ICreatePollUseCase, IFetchAllPollsUseCase, IUpdatePollUseCase, IVotePollUseCase } from "../../../domain/useCase/polls";
import { IDeletePostUseCase } from "../../../domain/useCase/posts";


export interface IUseCases {

    createPollUseCase: (dependencies: any) => ICreatePollUseCase;
    fetchAllPollsUseCase: (dependecies: any) => IFetchAllPollsUseCase;
    votePollUseCase: (dependencies: any) => IVotePollUseCase;
    deletePollUseCase: (dependencies: any) => IDeletePostUseCase;
    updatePollUseCase: (dependencies: any) => IUpdatePollUseCase
}