
import {IPostDependencies} from '../interface/IDependencies'
import {PostEntity} from '../../domain/entities'

export const createPostUseCase =(dependencies:IPostDependencies)=>{
           
    const {postRepositories:{create}}=dependencies

    return {
        execute:async (data:PostEntity)=>{
            try {
                return await create(data)
            } catch (error:any) {
                throw new Error (error.message || 'post creation failled')
            }
        }
    }
}