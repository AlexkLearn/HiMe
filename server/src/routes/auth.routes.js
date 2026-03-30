import { Router } from "express";
import {
  checkAuth, login, loginWithUsername,
  logout, signup
} from "../controllers/auth.controllers.js";
import authorize from "../middlewares/auth.middleware.js";


const authRouter = Router()

// Route: 'api/auth/signup'
authRouter.post('/signup', signup)

// Route: 'api/auth/login'
authRouter.post('/login', login)

// Route: 'api/auth/login/username'
authRouter.post('/login/username', loginWithUsername)

// Route: 'api/auth/logout'
authRouter.post('/logout', logout)

// Route: 'api/auth/check'
authRouter.get('/check', authorize, checkAuth)
// 👆 Runs on page reload to check if the user is still authenticated


export default authRouter;