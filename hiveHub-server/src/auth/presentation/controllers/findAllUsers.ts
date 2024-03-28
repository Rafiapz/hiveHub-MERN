import { IDependencies } from "../../application/interfaces/IDependencies";
import {Request,Response} from 'express'

export const findAllUsersController=(dependencies:IDependencies)=>{

    const {useCases:{findAllUsersUseCase}}=dependencies

    return async (req:Request,res:Response)=>{

        try {

            const allUsers=await findAllUsersUseCase(dependencies).execute()

            res.status(200).json({status:'ok',data:allUsers})
            
        } catch (error:any) {
            res.status(error.status||500).json({status:'failed',message:error.message})
        }
    }
}