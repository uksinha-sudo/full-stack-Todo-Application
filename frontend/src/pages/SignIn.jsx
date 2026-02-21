import { useRef, useState } from "react"
import { Input } from "../components/Input"
import { EyeClosed } from "../icons/EyeClosed"
import { EyeOpen } from "../icons/EyeOpenIcon"
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { Button } from "../components/Button"
import { BACKEND_URL } from "../configure.js"

export const SignIn = () => {

    const [viewPass, setViewPass] = useState(false);

    function handlePasswordViewer(){
        setViewPass(!viewPass)
    }

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    async function signin(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        
        try {

            const response = await axios.post(`${BACKEND_URL}/user/signin`, {
                email,
                password
            });
            alert("You have signed In");
            localStorage.setItem("token", response.data.token);
            console.log(response.data.token);
            navigate("/dashboard");
        } catch(error){
            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something Went Wrong")
            }
        }
    }

    return (
        <>
            <div className="h-[90vh] flex items-center justify-center ">

                <div className="flex flex-col gap-2 border rounded justify-center items-center">
                    <div className="p-4 flex flex-col gap-2 items-center">
                        <Input reference={emailRef} type={"email"} placeholder={"Email"} />
                        <Input reference={passwordRef} type={viewPass === true ? "text" : "password"} placeholder={"Password"} />
                        
                        <div className="relative bottom-9 left-30 cursor-pointer" onClick={handlePasswordViewer}>
                            {viewPass === true ? <EyeClosed /> : <EyeOpen />}
                        </div>
                        <Button text={"Sign In"} onClick={signin} buttonStyles={"cursor-pointer hover:bg-green-400 transition-all font-semibold p-2 bg-green-200"} />
                    </div>
                </div>
            </div>
        </>
    )
}