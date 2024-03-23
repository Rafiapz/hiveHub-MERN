import { ObjectId } from "mongodb";
import Comments from "../models/commentsModel"

export const findAllComments=async(postId:any)=>{

    try {

        console.log(postId);
        
        const comments=await Comments.find({postId:postId}).populate('userId')

        return comments

    } catch (error) {
        
    }
}