import { ObjectId } from "mongodb";
import Likes from "../models/likesModel";
import { LikesEntity } from "../../../domain/entities/likesEntity";

export const createLike=async (data:LikesEntity):Promise<LikesEntity|null>=>{

    try {

        const newLike= await Likes.create(data)

        return newLike
        
    } catch (error:any) {
        throw new Error(error.message)
    }

}