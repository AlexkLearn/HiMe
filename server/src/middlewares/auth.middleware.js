import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";


const authorize = async (req, res, next) => {
  try {
    let token;
    const auth = req.headers.authorization;

    if(auth && auth.startsWith('Bearer')) {
      token = auth.split(' ')[1]
    } 
    else {
      token = req.cookies.jwt;
    }

    if(!token) res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET )
    const user = await User.findById(decoded.id).select("-password")

    if(!user) res.status(401).json({ message: "Unauthorized" });

    req.user = user;

    next();
    
  }
  catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message })
  }
}


export default authorize;