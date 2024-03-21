import { genSalt, hash, compare } from "bcrypt";

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

export const comparePassword=async (reqPsw:string,ogPsw:string)=>{

  try {

    const status=await compare(reqPsw,ogPsw)

    return status
    
  } catch (error:any) {
    throw new Error (error.message)
  }
}