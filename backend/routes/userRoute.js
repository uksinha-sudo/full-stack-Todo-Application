import { Router } from "express";
import { userModel } from "../db.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config.js";


export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {

    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const existingUser = await userModel.findOne({
            email
        });
        if (existingUser) {
            res.status(403).send({
                message: "Email Already Linked with another Account"
            });
        } else {
            await userModel.create({
                username, email, password
            })

            res.send({
                message: "Account Created"
            });
        }
    } catch (e) {
        console.log(e);
    }


});

userRouter.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await userModel.findOne({
        email,
        password
    });

    if(!existingUser){
        res.status(403).send({
            message:"Incorrect Credentials"
        });
    } else {
        const token = jwt.sign({
            id: existingUser._id.toString()
        }, JWT_SECRET)

        res.send({
            message:"User logged in",
            token: token
        });
    }
});