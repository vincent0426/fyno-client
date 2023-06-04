import cat from "../images/cat.jpg";
import dog from "../images/dog.jpg";
import dog2 from "../images/dog2.jpg";
import dog3 from "../images/dog3.jpg";
import turtle from "../images/turtle.jpg";

export default function Hero() {
    return (
        <div className="bg-white">
            <main>
                <div className="relative isolate">
                    <svg
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                    >
                        <defs>
                            <pattern
                                height={200}
                                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                                patternUnits="userSpaceOnUse"
                                width={200}
                                x="50%"
                                y={-1}
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg className="overflow-visible fill-gray-50" x="50%" y={-1}>
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect
                            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
                            height="100%"
                            strokeWidth={0}
                            width="100%"
                        />
                    </svg>
                    <div className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden bg-emerald-300/[.2] blur-3xl lg:ml-24 xl:ml-48">
                        <svg aria-hidden="true" className="w-[50.0625rem]" viewBox="0 0 801 1036">
                            <path
                                d="m282.279 843.371 32.285 192.609-313.61-25.32 281.325-167.289-58.145-346.888c94.5 92.652 277.002 213.246 251.009-45.597C442.651 127.331 248.072 10.369 449.268.891c160.956-7.583 301.235 116.434 351.256 179.39L507.001 307.557l270.983 241.04-495.705 294.774Z"
                                fill="url(#70656b7e-db44-4b9b-b7d2-1f06791bed52)"
                                fillOpacity=".3"
                            />
                            <defs>
                                <linearGradient
                                    gradientUnits="userSpaceOnUse"
                                    id="70656b7e-db44-4b9b-b7d2-1f06791bed52"
                                    x1="508.179"
                                    x2="-28.677"
                                    y1="-116.221"
                                    y2="1091.63"
                                >
                                    <stop stopColor="#9089FC" />
                                    <stop offset={1} stopColor="#FF80B5" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pt-20">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    <h1 className="bg-gradient-to-r from-purple-500 to-sky-500 bg-clip-text py-2 text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl">
                                        Find Your Next Owner
                                    </h1>
                                    <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                        我們的使命是幫助寵物找到它們永遠的家園，我們通過創建一個安全且易於使用的平台來實現這一目標，讓寵物主人可以輕鬆地列出他們想要領養的寵物，而潛在的領養者則可以瀏覽現有的寵物資訊。
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <a
                                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            href="/posts"
                                        >
                                            開始領養
                                        </a>
                                        <a className="text-sm font-semibold leading-6 text-gray-900" href="/create-post">
                                            建立你的貼文！
                                            {" "}
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <div className="relative">
                                            <img
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                src={dog}
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <div className="relative">
                                            <img
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                src={turtle}
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                src={cat}
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                        <div className="relative">
                                            <img
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                src={dog2}
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                                src={dog3}
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
