import { IPostDependencies } from "../interface/IDependencies";

export const findUsersPostUseCase=(dependencies:IPostDependencies)=>{

    const {postRepositories:{findUsersPost}}=dependencies

    return {

        execute:async (id:any)=>{
            try {
                return await findUsersPost(id)
            } catch (error:any) {
                throw new Error(error.message)
            }
        }
    }
}