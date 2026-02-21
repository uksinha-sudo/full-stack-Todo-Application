import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js';
export function Middleware(req, res, next){
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            message:"no Token provided"
        });
    }

    try{

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({ message: "Invalid token" });
    }

}