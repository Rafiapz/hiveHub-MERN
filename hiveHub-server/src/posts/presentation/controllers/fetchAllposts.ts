import { IPostDependencies } from "../../application/interface/IDependencies";
import { Request, Response, NextFunction } from 'express'


export const fetchAllposts=(dependencies:IPostDependencies)=>{

    const {postUseCases:{findAllPostsUseCase}}=dependencies

    return async (req:Request,res:Response)=>{

        try {

            const user = req?.user
            const userId = (user as any)?.id;

           const {posts,likes}=await findAllPostsUseCase(dependencies).execute(userId)
           
           if(posts.length<=0){
            throw new Error('No posts found')
           }else{
   
            
            res.json({status:'ok',message:'success',data:{posts,likes}}).status(200)
           }

        } catch (error:any) {
            console.log(error.message);
            
            res.json({status:'failed',message:error.message})
            
        }
    }
}