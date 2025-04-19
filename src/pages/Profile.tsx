import { NavBar } from "@/components/NavBar";
import { selectUserInfo } from "@/state/slices/authSlice";
import { useSelector } from "react-redux";

export const Profile = () => {
    const userInfo = useSelector(selectUserInfo);

    return (
        <>
        <NavBar />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <div className="w-full h-full justify-center place-items-center flex flex-col gap-5">
                <div className="bg-white flex flex-col gap-7 justify-center place-items-center border-2 border-gray-400 rounded-2xl p-7 shadow-lg shadow-gray-400/30">
                    <h1 className="text-xl text-gray-700">Account Information</h1>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-10">
                            <div className="flex flex-col">
                                <label className="text-blue-500">First Name</label>
                                <p>{userInfo?.firstName}</p>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-blue-500">Last Name</label>
                                <p>{userInfo?.lastName}</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label  className="text-blue-500">Email</label>
                            <p>{userInfo?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
