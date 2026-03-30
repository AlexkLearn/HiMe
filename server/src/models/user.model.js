import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    minLength: [2, "Fullname must not be below 2 characters"]
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6, "Password must have a minimum of 6 characters" ]
  },
  profilePic: {
    type: String,
    default: ""
  }
}, { timestamps: true })

userSchema.pre('save', async function () {
  try {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10)
  }
  catch (e) {
    console.error(`Error hashing password: ${e.message}`);
  }
})

userSchema.methods.comparePassword = async function (password) {
  try {
    const isValid = await bcrypt.compare(password, this.password)
    return isValid;
  }
  catch (e) {
    console.error(`Error comparing password: ${e.message}`);
  }
}


const User = model('User', userSchema)
export default User;