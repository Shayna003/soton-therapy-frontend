
export const Onboarding = () => {
    return (
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <div className="w-full h-full justify-center place-items-center flex flex-col gap-5">
                <div className="bg-white flex flex-col gap-7 justify-center place-items-center border-2 border-gray-400 rounded-2xl p-7 shadow-lg shadow-gray-400/30">
                    <h1 className="text-2xl text-gray-700">Account Registration</h1>
                    <p className="text-gray-400">Please enter the following information:</p>
                    <form className="flex flex-col gap-2">
                        <div className="flex gap-3">
                            <div className="flex flex-col gap-2">
                                <label>First Name</label>
                                <input type="text"></input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Last Name</label>
                                <input type="text"></input>
                            </div>
                        </div>

                        <label>Email</label>
                        <input type="email"></input>

                        <label>Password</label>
                        <input type="password"></input>

                        <label>Repeat Password</label>
                        <input type="password"></input>
                        <p>Already have an account? <a className="text-blue-400" href="/login">Log In.</a></p>
                        <button className="w-30 self-center cursor-default rounded-lg border-3 border-transparent bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50 p-1 mt-3 text-white">Register</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}
