
export const LogIn = () => {
    return (
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <div className="w-full h-full justify-center place-items-center flex flex-col gap-5">
                <div className="bg-white flex flex-col gap-7 justify-center place-items-center border-2 border-gray-400 rounded-2xl p-7 shadow-lg shadow-gray-400/30">
                    <h1 className="text-2xl text-gray-700">Log In to your Account</h1>
                    <form className="flex flex-col gap-2">

                        <label>Email</label>
                        <input type="email"></input>

                        <label>Password</label>
                        <input type="password"></input>

                        <p>Don't have an account? <a className="text-blue-400" href="/onboard">Register.</a></p>
                        <button className="w-30 self-center cursor-default rounded-lg border-3 border-transparent bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50 p-1 mt-3 text-white">Log In</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}
