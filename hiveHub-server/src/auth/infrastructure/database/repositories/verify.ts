import {User} from '../models'

export const verify =async (data:{email:string,otp:string}) =>{
  

    try {

        const userData=await User.findOne({email:data.email},{otp:1,createdAt:1})

       
        if(userData?.otp!==data.otp){
            throw new Error ('Incorrect otp')
        }

        const timeStamp:any=new Date(userData.createdAt)
        const currentTime=Date.now()
        const timeDifference=currentTime-timeStamp
        if(timeDifference>=1000*60*1){

            throw new Error ('OTP has expired')
        }
        

        const user=await User.findOneAndUpdate({email:data.email,otp:data.otp},{isVerified:true,otp:''})        
        

        if(!user){
            throw new Error ('User updation failed')
        }

        const status=await User.findOne({email:data.email},{isVerified:1})
        
        
        if(!status?.isVerified){
            throw new Error ('User not verified')
        }

        return user
        
    } catch (error:any) {
        
        
        throw new Error(error.message)
    }
}