import { Posts } from "../models"
import Likes from "../models/likesModel"

export const findUsersPost=async (id:any)=>{

    try {

        const posts=await Posts.find({userId:id}).populate('userId')
        const likes=await Likes.find({userId:id})

        return {posts,likes}
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}