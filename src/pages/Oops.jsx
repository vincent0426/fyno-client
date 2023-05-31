import { useEffect, useState } from "react";

export default function Example() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    useEffect(() => {
        if (countdown === 0) {
            window.location.href = "/";
        }
    }, [countdown]);

    return (
        <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <figure className="mt-10">
                    <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                        <p>
                            Ooooooooops,網站故障囉，將在
                            {" "}
                            {countdown}
                            {" "}
                            秒後跳轉
                        </p>
                    </blockquote>
                    <figcaption className="mt-10">
                        <img
                            alt="logo"
                            className="mx-auto h-20 w-20 rounded-full"
                            src="logo.png"
                        />
                        <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                            <div className="text-xl text-gray-900">
                                <a href="/">不想等待請點此</a>
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
