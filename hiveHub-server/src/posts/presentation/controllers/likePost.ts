import { IPostDependencies } from "../../application/interface/IDependencies";
import {Request,Response} from 'express'
import { ObjectId } from "mongodb";
import { LikesEntity } from "../../domain/entities";

export const likePostController=(dependencies:IPostDependencies)=>{

    const{postUseCases:{likePostUseCase }}=dependencies

    return async (req:Request,res:Response)=>{

        try {
                        
            const user=req?.user
            const userIdData = (user as any)?.id;          
            const userId:ObjectId=Object(userIdData)

            const postIdData:string=req?.params?.postId
            const postId:ObjectId=Object(postIdData)
            
            const likeData={postId:postId,userId:userId}

           const like=await likePostUseCase(dependencies).execute

           console.log(like);
           
            
            
        } catch (error:any) {
            res.json({status:'failed',message:error.message})
        }

    }
}