import { verifyToken } from "../../../_lib/jwt";
import { IDependencies } from "../../application/interfaces/IDependencies";
import {Request,Response} from 'express'


export const fetchUserController=(dependencies:IDependencies)=>{

    const {useCases:{findOneUserUseCase}}=dependencies

    return async (req:Request,res:Response)=>{

        try {
           
            
            const token=req.cookies.userToken

            if(token){
                const authorized=verifyToken(token) 
    
                if(authorized){
                                 
                    const userData=await findOneUserUseCase(dependencies).execute({email:authorized.email})
                    res.json({status:'ok',userData})
                }else{
                    throw new Error('User not authorized')
                }
            }

        } catch (error:any) {
            res.json({status:'failed',message:error.message}).status(401)
        }
    }
}