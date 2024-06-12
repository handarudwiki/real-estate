import prisma from "../lib/prisma.js";
import bcrypt from 'bcrypt'

export const getUser = async(req, res)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{id:req.userId}
        })

        if(!user){
            return res.status(404).json({
                status : "error",
                message : "User not found"
            })
        }
        return res.status(200).json({
            status : "success",
            data : {
                id : user.id,
                username : user.username,
                email : user.email,
                avatar : user.avatar,
                created_at:user.cretated_at
            }
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}

export const update = async(req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:req.userId
            }
        })

        if(!user){
            return res.status(404).json({
                status : "error",
                message : "User not found"
            })
        }

       

        if(user.email !== req.body.email){
            const checkEmail = await prisma.user.findUnique({
                where:{email:req.body.email}
            })

            if(checkEmail){
                return res.status(409).json({
                    status : "error",
                    message : "Email already in use"
                })
            }
        }

        if(user.username !== req.body.username){
            const checkUsername = await prisma.user.findUnique({
                where:{username:req.body.username}
            })
            console.log(checkUsername)
            if(checkUsername){
                return res.status(409).json({
                    status : "error",
                    message : "Username already in use"
                })
            }
        }

        if(req.body.password){
            hashedPassword = await bcrypt.hash(req.body.password, 10)
        }
        const updatedUser = await prisma.user.update({
            data:{
                username : req.body.username,
                password : req.body.password && user.password,
                email : req.body.email,
                avatar : req.body.avatar
            },
            where:{
                id:req.userId
            }
        })


        return res.status(200).json({
            status : "success",
            data : {
                id : updatedUser.id,
                username : updatedUser.username,
                email : updatedUser.email,
                avatar : updatedUser.avatar,
                created_at : updatedUser.cretated_at
            }
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}

export const getAllUsers = async(req, res) =>{
    try {
        const users = await prisma.user.findMany()

        return res.status(200).json({
            status : "success",
            data : users
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}


export const savePost = async(req,res) =>{
    try {
        const userId = req.userId
        const savedPost = await prisma.savedPost.findUnique({
           where:{
            userId,
            postId : req.body.postId
           }
        })

        if(savedPost){
            await prisma.savedPost.delete({
                where :{
                    id : savedPost.id
                }
            })

            return res.status(200).json({
                status :"success",
                message : " deleted post in list"
            })
        }else{
            await prisma.savedPost.create({
                data : {
                    postId : req.body.postId,
                    userId
                }
            })

            return res.status(200).json({
                status : "success",
                message : "post saved"
            })
        }

        
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

export const pofilePost = async(req,res)=>{
    try {
        const userId = req.userId
        const posts = await prisma.post.findMany({
            where : {
                userId 
            }
        })

        const saved = await prisma.savedPost.findMany({
            where : {
                userId
            },
            include:{
                post:true
            }
        })

        const savedPosts = saved.map((item) => item.post);
        return res.status(200).json({
            status:"success",
            data : {posts,savedPosts }
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}


export const getNotificatons = async(req, res)=>{
    try {
        const userId = req.userId

        const number = await prisma.chat.count({
            where : {
                userIds:{
                    hasSome : [userId]
                },
                NOT : {
                    seenBy : {
                        hasSome : [userId]
                    }
                }
            }
        })

        return res.status(200).json(number)
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}