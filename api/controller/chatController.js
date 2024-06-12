import prisma from "../lib/prisma.js"

export const getChat = async (req,res)=>{
    console.log("test")
    try {
        const userId = req.userId

        const chat = await prisma.chat.findUnique({
            where :{
                id : parseInt(req.params.id),
                userIds : {
                    hasSome :[userId]
                },
            },
            include : {
                message : {
                    orderBy : {
                        createdAt : "asc"
                    }
                }
            }
        })

        return res.status(200).json({
            status : "success",
            data : chat
        })
        
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}
export const getAllChats = async (req,res)=>{
    try {
        const userId = req.userId
        const chats = await prisma.chat.findMany({
            where : {
                userIds : {
                    hasSome : [userId]
                }
            }
        })

        for(const chat of chats){
            const receiverId = chat.userIds.find(id=> id !== userId)

            const receriver = await prisma.user.findUnique({
                where : {
                    id : receiverId
                },
                select :{
                    id : true,
                    username : true,
                    avatar : true
                }
            })

            chat.receiver = receriver 
        }

        return res.status(200).json({
            status : "success",
            data: chats
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}
export const addChat = async (req,res)=>{
    try {
        const userId = req.userId
        const chat = await prisma.chat.create({
            data:{
                userIds : [userId, req.body.receiverId]
            }
        })

        return res.status(200).json({
            status : "success",
            data : chat
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}
export const readChat = async (req,res)=>{
    try {
        const userId = req.userId

        const chat = await prisma.chat.update({
            where : {
                id : parseInt(req.params.id),
                userIds :{
                    hasSome : [userId]
                }
            },
            data :{
                seenBy :{
                    set:[userId]
                }
            }
        })

        return res.status(200).json({
            status : "success",
            data : chat
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}

