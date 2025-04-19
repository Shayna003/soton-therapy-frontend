import { NavBar } from "@/components/NavBar";
import { usePostLogInMutation } from "@/state/api/authApi";
import { setUserInfo } from "@/state/slices/authSlice";
import { AuthResponse } from "@/types/response";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

export const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [triggerLogIn, {status, error, data}] = usePostLogInMutation();
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleLogIn = async (event: FormEvent) => {
        event.preventDefault();
        const result = (await triggerLogIn({
            email, password
        })) as AuthResponse | any;
        if (result?.data?.user?.id) {
            dispatch(setUserInfo(result.data.user));
            navigator("/chat");
        } else if ("error" in result && result?.error?.data?.error) {
            alert(result?.error?.data?.error);
        } else {
        }
    }

    return (
        <>
        <NavBar />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <div className="w-full h-full justify-center place-items-center flex flex-col gap-5">
                <div className="bg-white flex flex-col gap-7 justify-center place-items-center border-2 border-gray-400 rounded-2xl p-7 shadow-lg shadow-gray-400/30">
                    <h1 className="text-2xl text-gray-700">Log In</h1>
                    <form className="flex flex-col gap-2" onSubmit={handleLogIn}>

                        <label>Email</label>
                        <input required type="email" onChange={(e) => setEmail(e.target.value)}></input>

                        <label>Password</label>
                        <input required type="password" onChange={(e) => setPassword(e.target.value)}></input>

                        <p>Don't have an account? <Link className="text-blue-400 active:text-blue-500" to="/onboard">Register.</Link></p>
                        <button className="w-30 self-center cursor-default rounded-lg border-3 border-transparent bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50 p-1 mt-3 active:bg-blue-500 text-white">Log In</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
