import {Request,Response,NextFunction} from 'express'
import { verifyToken } from '../../../_lib/jwt';

export const isAuthorized=(req:Request,res:Response)=>{

    try {      
               
        
        const token=req.cookies.user_token

        if(token){
            const authorized=verifyToken(token) 

            if(authorized){
                res.json({status:'ok',message:'authorized'}).status(200)
            }else{
                res.json({status:'falied'}).status(403)
            }
        }
       
        
        
    } catch (error:any) {
        console.log(error.message);
        res.json({status:'failed',message:error.message}).status(500)
    }

}

export const auth=(req:Request,res:Response,next:NextFunction)=>{

    try {

        const token=req.cookies.user_token
        if(token){
            const authorized=verifyToken(token) 

            if(authorized){
                next()
            }else{
                res.json({status:'falied'}).status(200)
            }
        }
        
    } catch (error) {
        
    }
}