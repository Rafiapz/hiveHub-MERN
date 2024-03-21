import { ObjectId } from "mongoose"
import { IPostDependencies } from "../interface/IDependencies"
import { LikesEntity } from "../../domain/entities"

export const likePostUseCase=(dependencies:IPostDependencies)=>{

    const {postRepositories:{createLike}}=dependencies

    return {

        execute:async (data:LikesEntity)=>{
            try {
                return await createLike(data)
            } catch (error:any) {
                throw new Error(error.message)
            }
          
        }
    }
}