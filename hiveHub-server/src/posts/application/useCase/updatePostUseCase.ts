import { PostEntity } from "../../domain/entities";
import { IPostDependencies } from "../interface/IDependencies";

export const updatePostUseCase=(dependencies:IPostDependencies)=>{

    const {postRepositories:{updatePost}}=dependencies

    return {
        execute:async (data:PostEntity)=>{

            try {

                return await updatePost(data)
                
            } catch (error:any) {
                throw new Error(error.message)
            }
        }
    }
}