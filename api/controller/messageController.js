import prisma from "../lib/prisma.js"

export const addMessage = async (req, res)=>{
    try {
        const userId = req.userId
        const chatId = parseInt(req.params.chatId)
        const text = req.body.text

        const chat = await prisma.chat.findUnique({
            where : {id : chatId}
        })

        if(!chat) {
            return res.status(404).json({
                status : "error",
                data : "chat not found"
            })
        }

        const message = await prisma.message.create({
            data :{
                text,
                chatId : chat.id,
                userId 
            }
        })

        await prisma.chat.update({
            where:{
                id:chatId
            },
            data:{
                seenBy : [userId],
                lastMessage : text
            }
        })

        return res.status(200).json({
            status :"success",
            data : message
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}