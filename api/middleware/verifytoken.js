import jwt from "jsonwebtoken"

export const verifyToken = async(req,res,next)=>{
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                status : "error",
                message : "No Auth Token"
            })
        }

        jwt.verify(token,process.env.JWT_SECRET_KEY, (err,payload)=>{
            if(err){
                return res.status(401).json({
                    status : "error",
                    message : "token is invalid"
                })
            }

            req.userId = payload.id
            next()
        })
    } catch (error) {
    return res.status(500).json({
        status : "error",
        message : error.message
    })
    }
}