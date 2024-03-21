import { IPostDependencies } from "../../application/interface/IDependencies";
import { Request, Response, NextFunction } from 'express'


export const fetchAllposts=(dependencies:IPostDependencies)=>{

    const {postUseCases:{findAllPostsUseCase}}=dependencies

    return async (req:Request,res:Response)=>{

        try {

           const posts=await findAllPostsUseCase(dependencies).execute()
           
           if(posts.length<=0){
            throw new Error('No posts found')
           }else{
            
            
            res.json({status:'ok',message:'success',data:posts}).status(200)
           }

        } catch (error:any) {
            console.log(error.message);
            
            res.json({status:'failed',message:error.message})
            
        }
    }
}