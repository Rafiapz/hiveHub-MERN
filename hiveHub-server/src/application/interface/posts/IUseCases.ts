import { ICreateLikeUseCase } from "../../../domain/useCase/likes";
import { ICreatePostUseCase, IFindOneAndUpdateUseCase, IFindOneUseCase } from "../../../domain/useCase/posts";
import { IDeletePostUseCase } from "../../../domain/useCase/posts";
import { IFindAllPostsUseCase } from "../../../domain/useCase/posts";
import { IUPdatePostUseCase } from "../../../domain/useCase/posts";
import { IFindUsersPostUseCase } from "../../../domain/useCase/posts";



export interface IUseCases {

    createPostUseCase: (dependencies: any) => ICreatePostUseCase;
    findAllPostsUseCase: (dependencies: any) => IFindAllPostsUseCase;
    deletePostUseCase: (dependencies: any) => IDeletePostUseCase;
    updatePostUseCase: (dependencies: any) => IUPdatePostUseCase;
    findUsersPostUseCase: (dependencies: any) => IFindUsersPostUseCase;
    findOneAndUpdateUseCase: (dependencies: any) => IFindOneAndUpdateUseCase;
    findOneUseCase: (dependencies: any) => IFindOneUseCase
}