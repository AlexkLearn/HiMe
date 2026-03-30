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
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }

  try {
    const profile = await Profile.findOneAndUpdate(
      { username, bio}, {user: id },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    res.status(201).json(profile);
  } catch (e) {
    console.error(`Error setting profile: ${e.message}`);
    res.status(500).json({ Error: "Internal server error!" });
  }
}


export const updateUsername = async (req, res) => {
  const { username } = req.body;
  const id = req.user._id;
  if (!username) {
    return res.status(400).json({ message: 'Username required' });
  }

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: id },
      { username },
      { returnDocument: 'after' }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(updatedProfile);
  } catch (e) {
    console.error(`Error updating Username: ${e.message}`);
    res.status(500).json({ Error: "Internal server error!" });
  }
}


export const updateBio = async (req, res) => {
  const { bio } = req.body;
  const id = req.user._id;
  if (!bio) {
    return res.status(400).json({ message: 'Bio required' });
  }

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: id },
      { bio },
      { returnDocument: 'after' }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(updatedProfile);
  } catch (e) {
    console.error(`Error updating Bio: ${e.message}`);
    res.status(500).json({ Error: "Internal server error!" });
  }
}