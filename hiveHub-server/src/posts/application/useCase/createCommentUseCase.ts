import { CommentsEntity } from "../../domain/entities";
import { IPostDependencies } from "../interface/IDependencies";

export const createCommentUseCase=(dependencies:IPostDependencies)=>{

    const {postRepositories:{createComment}} =dependencies

    return {
        execute:async (data:any)=>{

            return await createComment(data)
            
        }
    }
}