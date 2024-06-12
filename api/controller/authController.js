import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res ) =>{
    try {
        let user =await prisma.user.findUnique({
            where:{
                username : req.body.username
            }
        })
        if(user){
            return res.status(409).json({
                status : "error",
                message : "username  aleady been taken"
            })
        }

         user = await prisma.user.findUnique({
            where:{
                email : req.body.email
            }
        })

        if(user){
            return res.status(409).json({
                status : "error",
                message : "email  aleady been taken"
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const savedUser = await prisma.user.create({
            data : {
                email : req.body.email,
                password : hashedPassword,
                username : req.body.username,
            }
        })

        
        return res.status(200).json({
            status : "success",
            data :{
                id : savedUser.id,
                email : savedUser.email,
                username : savedUser.username,
                created_at : savedUser.created
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message : error.message
        })
    }
}

export const login =async (req, res) =>{
    try {
        const user = await prisma.user.findUnique({
            where:{username : req.body.username}
        })

        if(!user){
            return res.status(401).json({
                status :"error",
                message : "Username or password wrong"
            })
        }
        const matchPassword = await bcrypt.compare(req.body.password, user.password)

        if(!matchPassword){
            return res.status(401).json({
                status :"error",
                message : "Username or password wrong disini"
            })
        }

        const age = 1000 * 60 * 60 * 24 * 7
        const token = jwt.sign({
            id : user.id,
            isAdmin: false
        }, process.env.JWT_SECRET_KEY, {expiresIn:age})

        const { password: userPassword, ...userInfo } = user;

        return res.cookie("token", token, {
            httpOnly:true,
            maxAge:age
        }).status(200).json(userInfo)
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}

export const logout = (req, res) => {
    try {
     return res.clearCookie("token").status(200).json({
        status : "success",
        message : "logout successfully"
     })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}
