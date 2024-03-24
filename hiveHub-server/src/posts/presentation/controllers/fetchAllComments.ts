import { IPostDependencies } from "../../application/interface/IDependencies";
import {Request,Response} from 'express'

export const fetChAllCommentsController=(dependencies:IPostDependencies)=>{

    const {postUseCases:{findAllCommentsUseCase}}=dependencies

    return async (req:Request,res:Response)=>{

        try {
         
            
            const postId=req?.params?.postId
              
            let comments= await findAllCommentsUseCase(dependencies).execute(postId)
            // comments=comments.reverse()        
            res.json({status:'ok',data:comments})
            
        } catch (error:any) {
            res.json({status:'failed',message:error.message}).status(error.status)
        }

    }
}   