import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from "../config/env.js";


export const signup = async (req, res) => {
  const { email, fullname, password } = req.body;

  if (!email.trim()|| !fullname.trim() || !password.trim()) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ message: "A user with the provided email already exist!" })
    }

    const user = await User.create({
      email: email.toLowerCase(),
      fullname, password
    })

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: NODE_ENV !== "development"
    })

    res.status(201).json(token)
  }
  catch (e) {
    console.error(e.message);
    res.status(500).json(`SignUp Error: ${e.message}`)
  }

}


export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim()) return res.status(400).json({ message: "Missing required fields!" })
  

  try {
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) return res.status(400).json({ message: "Invalid credentials!" })

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" })

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: NODE_ENV !== "development"
    })

    res.status(200).json(token)

  }
  catch (e) {
    console.error(`Login Error: ${e.message}`);
    res.status(500).json({ LoginError: e.message })
  }

}


export const loginWithUsername = async (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password.trim()) return res.status(400).json({ message: "Missing required fields!" })
  

  try {
    const existingProfile = await Profile.findOne({ username: username.toLowerCase() }).populate("user")
    if (!existingProfile || !existingProfile.user) return res.status(400).json({ message: "Invalid credentials!" })
    

    const user = existingProfile.user;
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" })
    

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: NODE_ENV !== "development"
    })

    res.status(200).json(token)

  }
  catch (e) {
    console.error(`Login Error: ${e.message}`);
    res.status(500).json({ LoginError: e.message })
  }
}


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully!" })
  }
  catch (e) {
    console.error(`Logout Error: ${e.message}`);
    res.status(500).json({ LogoutError: e.message })
  }
}


export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user)
  }
  catch (e) {
    console.error(`AuthError: ${e.message}`);
    res.status(500).json({ message: "Internal server error!" })
  }
}