import cloudinary from "../config/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";


export const getUsersPreview = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }
    }).select("-password")

    res.status(200).json(filteredUsers)
  }
  catch (e) {
    console.error(`Preview Error: ${e.message}`);
    res.status(500).json({ message: "Internal server error!" })
  }
}


export const getMessages = async (req, res) => {
  const { id: recieverid } = req.params.id;
  
  try {
    const senderId = req.user._id;
    
    const messages = await Message.find({
      $or: [
        { sender: senderId, reciever: recieverid },
        { sender: recieverid, reciever: senderId }
      ]
    })

    res.status(200).json(messages)
  }
  catch (e) {
    console.error(`Error getting messages: ${e.message}`);
    res.status(500).json({ message: "Internal server error!" })
  }
}


export const sendMessage = async (req, res) => {
  const { message, image } = req.body;
  const { id: reciever } = req.params.id;

  try {
    const sender = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url
    }

    const newMessage = await Message.create({
      sender, reciever, message,
      image: imageUrl
    })

    // TODO: implement real-time functionality -> socket.io

    res.status(200).json(newMessage)
  }
  catch (e) {
    console.error(`Error sending message: ${e.message}`);
    res.status(500).json({ message: "Internal server error!" })
  }
}