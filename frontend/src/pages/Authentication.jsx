import { Button } from "../components/Button";
import { SignUp } from "../components/SignUp";


function Authentication () {

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="border rounded flex flex-col items-center"> 
                <h3 className="p-2">Welcome To TODO</h3>
                <div className="p-2 flex flex-col gap-2">
                    <Button text={"Sign Up"}  buttonStyles={"cursor-pointer hover:bg-green-400 transition-all"} link={"/signup"}/>
                    <Button text={"Sign In"}  buttonStyles={"cursor-pointer hover:bg-green-400 transition-all"} link={"/signin"}/>
                </div>
            </div>
        </div>
    )

}


export default Authentication;