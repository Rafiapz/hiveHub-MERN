import { comparePassword } from "../../../_lib/bcrypt";
import { genereateToken } from "../../../_lib/jwt";
import { IDependencies } from "../../application/interfaces/IDependencies";
import {Request,Response,NextFunction} from 'express'
import axios from 'axios'
import { UserEntity } from "../../domain/entities";


export const googleAuthController=(dependencies:IDependencies)=>{

    const {useCases:{findOneUserUseCase,createUserUseCase}}=dependencies

    return async (req:Request,res:Response)=>{

        try {

            const googleAccessToken = req.body.googleAccesToken

            if(googleAccessToken){

            const response=await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
            const email:string=response.data.email
            
            
            const existingUser=await findOneUserUseCase(dependencies).execute({email:email})

            if(existingUser){

                const token=genereateToken({id:existingUser._id,email:existingUser?.email})

                res.cookie('user_token',token,{maxAge:1000*60*30,httpOnly:true})

                res.json({status:'ok',userData:existingUser}).status(200)

            }else{

                const googleData=response.data
                                
                
                const userData:UserEntity={
                    email:googleData.email,
                    isVerified:true,
                    createdAt:new Date(),
                    fullName:googleData.name,
                    isActive:true,
                    profilePhoto:googleData.picture,
                    username:googleData.name,  
                    password:googleData.sub                

                }

                const newUser=await createUserUseCase(dependencies).execute(userData)

                if(newUser){

                    const token=genereateToken({id:newUser._id,email:newUser?.email})
                                      
                    res.cookie('usre_token',token,{maxAge:1000*60*30,httpOnly:true})
                    res.json({status:'ok',userData:newUser}).status(200)
                }
            }

            }else{

                throw new Error('Unable to login with google')
            }

        } catch (error:any) {
            
            res.json({status:'failed',message:error.message})
        }

    }


}