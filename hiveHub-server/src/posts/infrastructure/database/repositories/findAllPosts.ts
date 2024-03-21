import { PostEntity } from "../../../domain/entities";
import { Posts } from "../models";

export const findAllPosts=async() =>{

    try {

          const posts=await Posts.find({}).populate('userId')
        
          return posts
        
    } catch (error:any) {
        throw new Error(error.message)
    }

}