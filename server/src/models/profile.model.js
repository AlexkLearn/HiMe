import { Schema, model } from "mongoose";
import User from "./user.model.js";


const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [2, "Username must not be below 2 characters!"],
    maxLength: [15, "Username must not exceed 15 characters!"]
  }, 
  bio: {
    type: String,
    default: "",
    maxLength: [75, "Bio must not exceed 75 characters!"]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    index: true,
    required: true
  }
})


const Profile = model('Profile', profileSchema)
export default Profile;