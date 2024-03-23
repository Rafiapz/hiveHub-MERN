import { CommentsEntity} from "../../../domain/entities";
import Comments from "../models/commentsModel";

export const createComment=async (data:any)=>{

    try {

        const comment=await Comments.create(data)

        return comment
        
    } catch (error:any) {
        throw new Error(error.message)        
    }
}