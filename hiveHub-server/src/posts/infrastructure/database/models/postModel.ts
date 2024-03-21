import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import {PostEntity} from '../../../domain/entities'



const PostsSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true,ref:'users' },
  content: { type: String },
  media: { 
    path:{type:String},
    type:{type:String}
  },
  createdAt: { type: Date },
  likes: [{ type: Schema.Types.ObjectId,  }],
  comments:[{ type: Schema.Types.ObjectId,  }],
  saves:[{ type: Schema.Types.ObjectId,  }],
  shares:[{ type: Schema.Types.ObjectId,  }],
  
});

export const Posts = mongoose.model<PostEntity>('Posts', PostsSchema);



