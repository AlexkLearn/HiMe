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

// Route: 'api/profile'
profileRouter.post('/', authorize, setProfile)

// Route: 'api/profile/username'
profileRouter.patch('/username', authorize, updateUsername)

// Route: 'api/profile/bio'
profileRouter.patch('/bio', authorize, updateBio)


export default profileRouter;