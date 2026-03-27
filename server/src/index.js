import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors"

import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import messageRouter from "./routes/message.routes.js";

import dbConnection from "./config/db.js";
import { PORT as port } from "./config/env.js";


const App = express()

// 3rd party middlewares
App.use(express.json())
App.use(cookieparser())
App.use(cors({
  origin: "http://localhost:5173",
  methods: [ 'GET', 'POST', 'PATCH', 'DELETE' ],
  credentials: true,
}))


// Routes
App.use('/api/auth', authRouter)
App.use('/api/profile', profileRouter)
App.use('/api/message', messageRouter)


App.listen(port || 3000, async () => {
  await dbConnection()
  console.log(`API running at http://localhost:${port || 3000}`);
})