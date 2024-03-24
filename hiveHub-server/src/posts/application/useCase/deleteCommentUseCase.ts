import { IPostDependencies } from "../interface/IDependencies";

export const deleteCommentUseCase=(dependencies:IPostDependencies)=>{

    const {postRepositories:{deleteComment}} = dependencies

    return {

        execute:async (commentId:string)=>{

            try {

                return await deleteComment(commentId)
                
            } catch (error:any) {
                throw new Error(error.message)
            }
        }
    }
}