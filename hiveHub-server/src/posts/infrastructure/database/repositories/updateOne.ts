import { PostEntity } from "../../../domain/entities";
import { Posts } from "../models";

export const updatePost=async(data:PostEntity)=>{

    try {
       

        const updatedPost=await Posts.findOneAndUpdate({_id:data._id},{$set:data},{new:true})
       
        
       return updatedPost
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}