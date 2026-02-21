import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

export const userModel = mongoose.model("User", userSchema);

const TodoSchema = new mongoose.Schema({
    task: String,
    completion: {type: Boolean },
    userId: {type: Schema.Types.ObjectId, ref: "User"}
});

export const todoModel = mongoose.model("Todo", TodoSchema);