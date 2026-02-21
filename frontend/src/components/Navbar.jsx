import { EyeClosed } from "../icons/EyeClosed"
import { Button } from "./Button"


export const Navbar = () => {
    return <nav className="flex bg-gray-200 justify-between items-center min-h-[8vh]">
        <p className="font-bold ml-5">T<span className="text-2xl text-green-300">O</span>D<span className="text-2xl text-green-300">O</span></p>
        <div className="flex gap-2 mr-2">

            <Button text={"Sign Up"} buttonStyles={"cursor-pointer hover:bg-green-400 transition-all"} link={"../Signup"} />
            <Button text={"Sign In"} buttonStyles={"cursor-pointer hover:bg-green-400 transition-all"} link={"../Signin"} />

        </div>
    </nav>
}