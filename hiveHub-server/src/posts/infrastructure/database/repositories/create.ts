import {Posts} from '../../../infrastructure/database/models'
import {PostEntity} from '../../../domain/entities/postEntity'

export const create =async (data: PostEntity): Promise<PostEntity | null > =>{

    try {

        const newPost=await Posts.create(data)
      
        return newPost
        
    } catch (error:any) {
        console.log(error);
        
        throw new Error(error.message)
    }
}