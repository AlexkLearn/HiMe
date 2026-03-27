import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";


const authRouter = Router()

// Route: 'api/auth/signup'
authRouter.post('/signup', signup)

// Route: 'api/auth/login'
authRouter.post('/login', login)

// Route: 'api/auth/logout'
authRouter.post('/logout', logout)


export default authRouter;