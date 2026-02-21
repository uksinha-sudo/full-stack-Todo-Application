import { Router } from "express";
import { Middleware } from "../auth.js";
import { todoModel } from "../db.js";

export const todoRouter = Router();

todoRouter.post("/create", Middleware, async(req, res)=>{
    const userId = req.user.id;

    const task = req.body.task;
    const completion = req.body.completion;
    try{

        await todoModel.create({
            task, completion, userId
        });
        res.json({
            message:"Todo Created",
            userId
        });
    } catch(e){
        console.log(e);
        res.status(500).send({
            message:"Internal Server error"
        });
    }

});


todoRouter.get("/todos", Middleware, async(req,res)=>{
    const userId = req.user.id;

    const response = await todoModel.find({
        userId
    });

    res.send({
        response
    });
});

todoRouter.delete("/delete", Middleware, async(req, res)=>{
    const userId = req.user.id;
    const todoId = req.body.todoId;

    try{        
        const response = await todoModel.findOneAndDelete({
            userId,
            _id: todoId
        });
        
        if(!response){
            res.send({
                message:"Todo Not found"
            });
        } else {
            res.send({
                message:"Deleted Todo"
            })
        }
    } catch(e){
        console.log(e)
    }

})