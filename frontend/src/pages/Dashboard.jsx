import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { DeleteIcon } from "../icons/DeleteIcon"
import { PenciIcon } from "../icons/PencilIcon"
import { useNavigate } from "react-router-dom"
export const Dashboard = () => {
    const navigate = useNavigate();
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);



    async function addTask() {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/todo/create`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    task: task,
                    completion: false
                })
            });

            const data = await response.json();

            setTodos([...todos, data.todo]);
            setTask("") //clear input after adding
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function fetchTodo() {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await fetch(`${backendUrl}/todo/todos`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            const data = await response.json();
            setTodos(data.response);
        }

        fetchTodo();
    }, [])

    function signOut() {
        localStorage.removeItem("token");
        navigate("/authentication");
    }

    async function deleteTodo(id) {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            await fetch(`${backendUrl}/todo/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    todoId: id
                })
            })
            //remove from state
            setTodos(prev => prev.filter(todo => todo._id !== id));
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="w-screen h-[90vh] flex justify-center items-center">
            <div className="border p-2 gap-2 flex rounded bg-slate-100 flex-col">
                <div className="flex gap-2">
                    <input type="text" placeholder="Enter Task" value={task} onChange={(e) => setTask(e.target.value)} className="border p-1 w-70 outline-none font-semibold rounded" />
                    <Button buttonStyles={"cursor-pointer font-semibold hover:bg-green-400 transition-all "} text={"Add"} onClick={addTask} />
                </div>
                {todos.map((todo) => (

                    <div key={todo._id} className="flex gap-2 mt-5">
                        <p className="border-r p-1.5 w-70" >{todo.task}</p>
                        <div className="border flex items-center justify-center rounded-2xl cursor-pointer">
                            <PenciIcon />
                        </div>
                        <div className="border flex items-center justify-center rounded-2xl cursor-pointer" onClick={() => deleteTodo(todo._id)}>
                            <DeleteIcon />
                        </div>
                    </div>
                ))}

                <div className="flex justify-center mt-5">
                    <Button onClick={signOut} text={"Sign Out"} buttonStyles={" bg-red-300 hover:bg-red-500 cursor-pointer transition-all"} />
                </div>
            </div>
        </div>

    )
}