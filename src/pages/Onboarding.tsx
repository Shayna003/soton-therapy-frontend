import { NavBar } from "@/components/NavBar";
import { useGetUserInfoQuery, usePostSignUpMutation } from "@/state/api/authApi";
import { selectUserInfo, setUserInfo } from "@/state/slices/authSlice";
import { AuthResponse } from "@/types/response";
import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

export const Onboarding = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [triggerSignUp, {status, error, data}] = usePostSignUpMutation();
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const validateSignUp = (): boolean => {
        if (password !== repeatPassword) {
            alert("The passwords you've entered do not match");
            return false;
        }
        return true;
    };

    const handleSignUp = async (event: FormEvent) => {
        event.preventDefault();
        if (validateSignUp()) {
            const result = (await triggerSignUp({
                email, firstName, lastName, password
            })) as AuthResponse | any;
            if (result?.data?.user?.id) {
                dispatch(setUserInfo(result.data.user));
                navigator("/chat");
              } else {
                if ("error" in result && result?.error?.data?.error) {
                  alert(result?.error?.data?.error);
                }
            }
        }
    }

    return (
        <>
        <NavBar />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <div className="w-full h-full justify-center place-items-center flex flex-col gap-5">
                <div className="bg-white flex flex-col gap-7 justify-center place-items-center border-2 border-gray-400 rounded-2xl p-7 shadow-lg shadow-gray-400/30">
                    <h1 className="text-2xl text-gray-700">Account Registration</h1>
                    <p className="text-gray-400">Please enter the following information:</p>
                    <form className="flex flex-col gap-2" onSubmit={handleSignUp}>
                        <div className="flex gap-3">
                            <div className="flex flex-col gap-2">
                                <label>First Name</label>
                                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"></input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Last Name</label>
                                <input required value={lastName} onChange={(e) => setLastName(e.target.value)} type="text"></input>
                            </div>
                        </div>

                        <label>Email</label>
                        <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email"></input>

                        <label>Password</label>
                        <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password"></input>

                        <label>Repeat Password</label>
                        <input required value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password"></input>

                        <p>Already have an account? <Link className="text-blue-400 active:text-blue-500" to="/login">Log In.</Link></p>
                        <button className="w-30 self-center cursor-default rounded-lg border-3 border-transparent bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50 p-1 mt-3 text-white active:bg-blue-500">Register</button>
                    </form>
                </div>
                
            </div>
        </div>
        </>
    )
}
