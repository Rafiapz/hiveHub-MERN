import {User} from '../../../infrastructure/database/models'
import {UserEntity} from '../../../domain/entities/userEntity'

export const create =async (data: UserEntity): Promise<UserEntity | null > =>{

    try {

        const newUser=await User.create(data)

        return newUser
        
    } catch (error) {
        console.log(error);
        
        throw new Error('User creation failed')
    }
}