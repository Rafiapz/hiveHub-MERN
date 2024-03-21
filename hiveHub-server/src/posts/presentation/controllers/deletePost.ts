import { ObjectId } from "mongodb";
import { IPostDependencies } from "../../application/interface/IDependencies";
import { Request, Response, NextFunction } from 'express'

export const deletePostController = (dependencies: IPostDependencies) => {

    const { postUseCases: { deletePostUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
           
            
            if (typeof req?.query?.id === 'string') {
                const id: string = req.query.id
                console.log(id);
                
                const status = await deletePostUseCase(dependencies).execute({ _id: id })

                if(status.deletedCount===1){
                    res.json({status:'ok',message:'The post has been successfully deleted'}).status(200)
                }else{
                    throw new Error('Something went wrong unable to delete post')
                }

               
            }


        } catch (error: any) {
            res.json({status:'failed', message: error.message }).status(400)
        }

    }
}