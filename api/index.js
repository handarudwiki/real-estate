import express from "express";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import postRouter from "./routes/post.js"
import chatRouter from "./routes/chat.js"
import messageRouter from "./routes/message.js"
import cors from "cors"


const app = express();
const router = express.Router()

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))

app.use("/",authRouter)
app.use("/users", userRouter)
app.use("/posts",postRouter)
app.use("/messages", messageRouter)
app.use("/chats", chatRouter)


app.listen(3000, ()=>{
    console.log('listening on port 3000');
})