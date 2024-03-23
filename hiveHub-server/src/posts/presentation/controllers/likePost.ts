import { IPostDependencies } from "../../application/interface/IDependencies";
import { Request, Response } from 'express'
import { LikesEntity } from "../../domain/entities";
import mongoose from "mongoose";


export const likePostController = (dependencies: IPostDependencies) => {

    const { postUseCases: { likePostUseCase, } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const userIdData = (user as any)?.id;
            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(userIdData)

            const postIdData: string = req?.params?.postId
            const postId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(postIdData)


            const likeData: LikesEntity = { postId: postId, userId: userId }

            const {posts,likes} = await likePostUseCase(dependencies).execute(likeData)

                  
            
            if(posts){
                const like=posts               

                if(like==='deleted')
                    res.json({status:'ok',message:'Succesfully disliked post'}).status(200)
                else
                res.json({status:'ok',message:"Successfully liked the post",data:{posts,likes}}).status(200)
            }else {
                throw new Error( 'Unable to like the post')
            }


        } catch (error: any) {
            res.json({ status: 'Failed', message: error.message }).status(400)
        }

    }
}