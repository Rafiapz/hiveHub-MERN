import { DeleteResult, ObjectId } from "mongodb";

export interface IDeletePostUseCase{

    execute(data:{_id:string}):Promise<DeleteResult>

}