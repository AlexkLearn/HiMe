import { Schema, model } from "mongoose";
import User from "./user.model.js";


const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  reciever: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  
  message: { type: String },

  image: { type: String }

}, { timestamps: true })


const Message = model('Message', messageSchema)
export default Message;