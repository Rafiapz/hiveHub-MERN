import {Request,Response,NextFunction} from 'express'
import { IDependencies } from '../../application/interfaces/IDependencies'
import { passwordHashing } from '../../../_lib/bcrypt'
import { generateOtp } from '../../../_lib/otp'


export const signupController=(dependencies:IDependencies)=>{


        const {useCases:{createUserUseCase}}=dependencies

    return async (req:Request,res:Response)=>{

        try {
            
            let data=req.body
            data.isActive=true
            data.role='user'
            data.isVerified=false
            data.password=await passwordHashing(data.password)
            data.createdAt=Date.now()
            const otpDetails= generateOtp(data.email)
            const otp=otpDetails?.OTP
            data.otp=otp           
            
           const user=await createUserUseCase(dependencies).execute(data)

           if(user){            
            res.status(200).json({status:'ok',userData:user})
           }else{
            throw new Error('failed to verify email')
           }

            

        } catch (error:any) {

            res.json({status:'failed',message:error.message}).status(400)
            console.log(error);
            
            
        }   
    }
}