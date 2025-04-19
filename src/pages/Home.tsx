
export const Home = () => {
    return (
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <div className="w-full h-full justify-center place-items-center flex flex-col gap-5">
                <h1 className="font-semibold text-gray-900 text-3xl">AI Chatbot for <span className="">Mental Health Therapy</span></h1>
                <h2 className="text-gray-500">SotonTherapy is the research project of a group of University of Southampton Students</h2>
                <div className="flex gap-3">
                    <a
                        href="/onboard"
                        className="cursor-default rounded-lg border-3 border-transparent bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50 p-2 text-white"
                    >
                     Try Now
                    </a>
                    <a
                        href="/login"
                        className="cursor-default rounded-lg border-3 border-blue-400 hover:shadow-lg bg-white hover:shadow-blue-400/50 p-2 text-blue-400"
                    >
                        Log In
                    </a>
                </div>
            </div>
        </div>
    )
}