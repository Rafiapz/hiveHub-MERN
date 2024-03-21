import { IPostDependencies } from "../interface/IDependencies"


export const findAllPostsUseCase=(dependencies:IPostDependencies)=>{

        const {postRepositories:{findAllPosts}}=dependencies
    return{

        execute:()=>{

          return findAllPosts()

        }

    }
}