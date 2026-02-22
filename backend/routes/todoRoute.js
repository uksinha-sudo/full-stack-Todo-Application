import { Router } from "express";
import { Middleware } from "../auth.js";
import { todoModel } from "../db.js";

export const todoRouter = Router();

todoRouter.post("/create", Middleware, async(req, res)=>{
    const userId = req.user.id;

    const task = req.body.task;
    const completion = req.body.completion;
    try{

        const newTodo = await todoModel.create({
            task, completion, userId
        });
        res.json({
            message:"Todo Created",
            todo: newTodo
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
                message:"Deleted Todo",
                deletedTodo: response
            })
        }
    } catch(e){
        console.log(e)
    }

})

todoRouter.put("/update", Middleware, async (req, res) => {
    const { todoId, task } = req.body;
    const userId = req.user.id;

    try {
        const updatedTodo = await todoModel.findOneAndUpdate(
            { _id: todoId, userId },
            { task },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo updated", todo: updatedTodo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});