import express from "express"
import mongoose from "mongoose"
import dns from "node:dns/promises";
import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken"
dns.setServers(["1.1.1.1"]);

const mongodbURI = "mongodb+srv://admin:1234@cluster0.wnkxql3.mongodb.net/?appName=Cluster0"

mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("connected to mongodb cluster")
    }
)

let app = express()

app.use(express.json())

app.use(
    (req,res,next)=>{
        const authorizationHeader = req.header("Authorization")
        if(authorizationHeader != null){
            const token = authorizationHeader.replace("Bearer ","")
            
            jwt.verify(token,"secretKey96$2025",
            (error,content)=>{
                if(content == null){
                    console.log("Invalid token")
                    res.json({
                        message : "Invalid token"
                    })
                    
                }else{
                    console.log(content)
                    req.user = content
                    next()
                }

            }
        )
    }    
}
)


app.use("/students",studentRouter) 

app.use("/users",userRouter)


app.listen(5000,()=>{
        console.log("server is running...")
    }
)