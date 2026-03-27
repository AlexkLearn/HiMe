import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import cloudinary from '../config/cloudinary.js';


export const updateProfilePic = async (req, res) => {
  const { profilePic } = req.body;
  const id = req.user._id
  if (!profilePic) return;

  try {
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profilePic: uploadResponse.secure_url },
      { returnDocument: "after" }
    )

    res.status(200).json(updatedUser)
  }
  catch (e) {
    console.error(`Error updating profile picture: ${e.message}`);
    res.status(500).json({ Error: "Internal server error!" })
  }
}


export const setProfile = async (req, res) => {
  const { username, bio } = req.body;
  const id = req.user._id;
  if (!username) (
    res.status(400).json({ message: "Username required" })
  )

  try {
    const profile = await Profile.create({
      username, bio, user: id
    })

    res.status(201).json(profile)
  }
  catch (e) {
    console.error(`Error updating profile: ${e.message}`);
    res.status(500).json({ Error: "Internal server error!" })
  }
}


export const updateUsername = async (req, res) => {
  const { username } = req.body;
  const id = req.user._id;
  if (!username) (
    res.status(400).json({ message: 'Username required' })
  )

  try {
    const profile = await Profile.findOne({ user: id })
    const updatedProfile = await profile.updateOne({ username })
    res.status(200).json(updatedProfile)
  }
  catch (e) {
    console.error(`Error updating Username: ${e.message}`);
    res.status(500).json({ Error: "Internal server error!" })
  }
}


export const updateBio = async (req, res) => {
  const { bio } = req.body;
  const id = req.user._id;
  if (!bio) (
    res.status(400).json({ message: 'Bio required' })
  )

  try {
    const profile = await Profile.findOne({ user: id })
    const updatedProfile = await profile.updateOne({ bio })
    res.status(200).json(updatedProfile)
  }
  catch (e) {
    console.error(`Error updating Bio: ${e.message}`);
    res.status(500).json({ Error: "Internal server error!" })
  }
}