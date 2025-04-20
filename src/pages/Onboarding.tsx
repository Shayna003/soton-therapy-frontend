import { NavBar } from "@/components/NavBar";
import { usePostSignUpMutation } from "@/state/api/authApi";
import { selectUserInfo, setUserInfo } from "@/state/slices/authSlice";
import { AuthResponse } from "@/types/response";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

export const Onboarding = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [triggerSignUp] = usePostSignUpMutation();
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const [agreed, setAgreed] = useState(false);

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
    };

    return (
        <>
            <NavBar />
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] overflow-auto">
                <div className="w-full h-full justify-center items-center flex flex-col gap-5 px-4 py-10">
                    <div className="bg-white flex flex-col gap-7 justify-center items-center border-2 border-gray-400 rounded-2xl p-7 shadow-lg shadow-gray-400/30 max-w-md w-full">
                        <h1 className="text-2xl text-gray-700 font-bold">
                            {showDisclaimer ? "Please Read Before Signing Up" : "Account Registration"}
                        </h1>

                        {showDisclaimer ? (
                            <>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    This AI chatbot is part of a <strong>research project</strong> and is <strong>not a substitute</strong> for professional mental health care.
                                    <br /><br />
                                    While it has been fine-tuned using therapist-patient dialogue data, it may produce inaccurate, inappropriate, or unhelpful responses.
                                    <br /><br />
                                    If you are in distress, facing a mental health crisis, or require medical attention, please seek help from a licensed mental health professional or emergency services.
                                    <br /><br />
                                    <strong>
                                        By using this chatbot, you acknowledge that it is an experimental tool designed for research and testing purposes only.
                                    </strong>
                                </p>
                                <div className="flex items-center gap-2 mt-4">
                                    <input type="checkbox" id="agree" checked={agreed} onChange={() => setAgreed(!agreed)} />
                                    <label htmlFor="agree" className="text-gray-700 text-sm">
                                        I have read and agree to the disclaimer above.
                                    </label>
                                </div>
                                <button
                                    disabled={!agreed}
                                    onClick={() => setShowDisclaimer(false)}
                                    className={`mt-4 px-4 py-2 rounded-lg text-white ${
                                        agreed ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Continue
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-400">Please enter the following information:</p>
                                <form className="flex flex-col gap-3 w-full" onSubmit={handleSignUp}>
                                    <div className="flex gap-3">
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <label>First Name</label>
                                            <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                                        </div>
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <label>Last Name</label>
                                            <input required value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                                        </div>
                                    </div>

                                    <label>Email</label>
                                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" />

                                    <label>Password</label>
                                    <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

                                    <label>Repeat Password</label>
                                    <input required value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" />

                                    <p className="text-sm text-gray-500">
                                        Already have an account?{" "}
                                        <Link className="text-blue-400 hover:underline active:text-blue-500" to="/login">
                                            Log In.
                                        </Link>
                                    </p>
                                    <button className="w-32 self-center rounded-lg bg-blue-400 hover:bg-blue-500 text-white p-2 mt-3">
                                        Register
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};