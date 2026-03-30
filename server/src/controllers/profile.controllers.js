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


export const setAndUpdateProfile = async (req, res) => {
  const { username, bio } = req.body;
  const id = req.user._id;

  try {
    const existingProfile = await Profile.findOne({ user: id });

    if (!existingProfile && !username) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (!username && ( bio === undefined || bio === null )) {
      return res.status(400).json({ message: "At least one field is required" });
    }

    if (username) {
      const taken = await Profile.findOne({
        username: username.toLowerCase().trim(),
        user: { $ne: id },
      });

      if (taken) {
        return res.status(400).json({ message: "Username is taken" });
      }
    }

    const updates = {};
    if (username) updates.username = username.toLowerCase().trim();
    if (bio) updates.bio = bio;

    const profile = await Profile.findOneAndUpdate(
      { user: id },
      { $set: updates },
      {
        upsert: true,
        returnDocument: 'after',
        setDefaultsOnInsert: true,
        runValidators: true,
        context: 'query'
      }
    );

    return res.status(200).json(profile);
  } catch (e) {
    console.error(`Error setting profile: ${e.message}`);
    res.status(500).json({ Error: "Internal server error!" });
  }
};