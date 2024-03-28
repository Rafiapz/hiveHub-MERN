import { User } from "../models";

export const findAllUsers=async ()=>{

    try {

        const AllUsers=await User.find({})

        return AllUsers
        
    } catch (error:any) {
        throw new Error(error)
    }
}