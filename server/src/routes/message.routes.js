import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getMessages, getUsersPreview,
  sendMessage
} from "../controllers/message.controllers.js";


const messageRouter = Router()


// Route: 'api/message/preview'
messageRouter.get('/preview', authorize, getUsersPreview)

// Route: 'api/message/'
messageRouter.get('/:id', authorize, getMessages)

// Route: 'api/message/'
messageRouter.post('send/:id', authorize, sendMessage)


export default messageRouter;