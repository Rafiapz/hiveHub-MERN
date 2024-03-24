import {ObjectId} from 'mongoose'

export interface PostEntity{

    _id?:ObjectId;
    userId:ObjectId;
    content?:string;
    media?:{type:string,path:string};
    createdAt?:Date;
    likes?:Number;
    comments?:Number;
    saves?:ObjectId[] | null;
    shares?:ObjectId[] | null;
}   