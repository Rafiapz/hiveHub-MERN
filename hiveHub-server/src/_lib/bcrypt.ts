import { genSalt, hash, compare } from "bcrypt";
import {NextFunction, Request,Response} from 'express'

export const passwordHashing = async (psw: string) => {
  try {

    const salt=await genSalt(10)
    const hashPwd = await hash(psw,salt);
    if(!hashPwd){
        throw new Error ('Password hashing error')
    }
    return hashPwd
  } catch (error:any) {
    throw new Error (error.message)
  }
};


export const validatePassword=async(req:Request,res:Response,next:NextFunction)=>{

  try {
  
   const status=await comparePassword(req?.body?.oldPassword,req?.body?.ogOldPassword)

   if(status){
     next()
   }else{
    
    res.status(200).json({status:'invalid',error:'incorrect old password'})
   }
    
  } catch (error:any) {
    res.status(error.status||400)
  }
}

export const comparePassword=async (reqPsw:string,ogPsw:string)=>{

  try {

    const status=await compare(reqPsw,ogPsw)

    return status
    
  } catch (error:any) {
    throw new Error (error.message)
  }
}