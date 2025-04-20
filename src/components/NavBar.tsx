import { usePostLogOutMutation } from "@/state/api/authApi";
import { selectUserInfo, setUserInfo } from "@/state/slices/authSlice";
import { SignOutResponse } from "@/types/response";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

export const NavBar = () => {
    const userInfo = useSelector(selectUserInfo);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [triggerLogOut] = usePostLogOutMutation();

    const logout = async () => {
        const result = (await triggerLogOut({})) as SignOutResponse | any;
        if ("data" in result && result.data.message) {
            navigator("/");
            dispatch(setUserInfo(undefined));
        }
    }

    return (
        <div className="w-full flex gap-2 justify-center place-items-center bg-none z-50">
            <div className="w-full self-start flex gap-5 justify-start place-items-start pl-7 pt-3 bg-none">
                <Link className="text-blue-500 hover:text-blue-400 active:text-blue-300" to="/">Home</Link>
            </div>
            {
                userInfo ?
                <div className="w-full self-end flex gap-5 justify-end place-items-end pr-7 pt-3">
                    <Link className="text-blue-500 hover:text-blue-400 active:text-blue-300" to="/chat">Chat</Link>
                    <Link className="text-blue-500 hover:text-blue-400 active:text-blue-300" to="/profile">Account</Link>
                    <span className="cursor-pointer text-blue-500 hover:text-blue-400 active:text-blue-300" onClick={logout}>Log Out</span>
                </div>
                :
                <></>
            }
        </div>
    )
};