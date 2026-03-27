import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  updateBio,
  setProfile, updateProfilePic,
  updateUsername,
} from "../controllers/profile.controllers.js";


const profileRouter = Router()

// Route: 'api/profile'
profileRouter.patch('/', authorize, updateProfilePic)
profileRouter.post('/', authorize, setProfile)
profileRouter.patch('/username', authorize, updateUsername)
profileRouter.patch('/bio', authorize, updateBio)


export default profileRouter;