import { IFindChatsByIdUseCase, IFindCoversationByIdUseCase } from "../../../domain/useCase/chats";
import { ICreateChatUseCase } from "../../../domain/useCase/chats/ICreateChatUseCase";
import { ICreateConversationUseCase } from "../../../domain/useCase/chats/ICreateConversationUseCase";


export interface IUseCases {

    createChatUseCase: (dependencies: any) => ICreateChatUseCase;
    createConversationUseCase: (dependencies: any) => ICreateConversationUseCase;
    findConversationByIdUseCase: (dependencies: any) => IFindCoversationByIdUseCase;
    findChatsByIdUseCase: (dependencies: any) => IFindChatsByIdUseCase
}