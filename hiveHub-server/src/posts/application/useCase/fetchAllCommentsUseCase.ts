import { IPostDependencies } from "../interface/IDependencies";

export const findAllCommentsUseCase=(dependencies:IPostDependencies)=>{

    const {postRepositories:{findAllComments}}=dependencies

    return {

        execute:(postId:any)=>{

            try {
                
                return findAllComments(postId)
            } catch (error:any) {
                throw new Error(error.message)
            }
        }
    }
}