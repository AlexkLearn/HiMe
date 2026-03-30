import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { updateProfilePic, setAndUpdateProfile } from "../controllers/profile.controllers.js";


const profileRouter = Router()

// Route: 'api/profile'
profileRouter.patch('/', authorize, updateProfilePic)

// Route: 'api/profile'
profileRouter.post('/', authorize, setAndUpdateProfile)


export default profileRouter;