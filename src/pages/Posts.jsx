import { useEffect, useState } from "react";

import axiosClient from "../utils/axiosClient";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    console.log("post init");
    useEffect(() => {
        console.log("posts page");

        const getPosts = async () => {
            try {
                const { data } = await axiosClient.get("/api/posts");
                setPosts(data.posts);
                console.log("data", data);
            } catch (error) {
                console.log("error", error);
            }
        };

        getPosts();
    }, []);

    return (
        posts.length &&(
        <div className="bg-emerald-300/[.2]  py-5 sm:py-10 ">
            <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8 h-96 bg-[url('https://source.unsplash.com/6GMq7AGxNbE')] bg-no-repeat bg-cover bg-center bg-fixed">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">開始認養你的下一個寵物！</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        別怕，我們一起回家
                    </p>
                </div>
                <div className="group relative rounded mt-8 h-56 w-2/5 hover:backdrop-grayscale-[.5] hover:backdrop-blur-sm border-double border-4 border-l-teal-950 border-opacity-10">
                    <p>根據您的條件搜尋...</p>

                    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg border border-slate-700 focus:ring-1 focus:outline-none focus:ring-green-300 invisible group-hover:visible absolute bottom-4 right-4 hover:bg-opacity-90 animate-bounce">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span className="sr-only">Search</span>
                    </button>

                </div>
            </div>
            <div className="mt-10 flex flex-column md:flex-row justify-evenly relative h-[18rem] md:h-[24rem]">
                <div>
                    <div className="font-semibold text-3xl top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 absolute underline decoration-teal-600 decoration-4 truncate ...">您的每日推薦</div>
                </div>
                <div className="group w-1/3 h-full  top-1/2 right-1/4 transform -translate-y-1/2 absolute">
                    <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        <div className="absolute inset-0">
                            <img className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src="https://source.unsplash.com/J4itE356ie0" />
                        </div>
                        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <div className="flex min-h-full flex-col items-center justify-center">
                            <h1 className="text-3xl font-bold">{posts[0].name}</h1>
                            <p className="text-lg">{posts[0].kind}</p>
                            <p className="text-sm">{posts[0].gender}, {posts[0].age}yr</p>
                            <p className="text-base">{posts[0].content}</p>
                            <button className="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900">Read More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-9 mt-4 place-items-center border-t border-gray-200 pt-2 grid gap-x-8 gap-y-4 grid grid-cols-2 lg:grid-cols-3 place-content-evenly">
                {posts && posts.map((post) => (
                    <article key={post.id} className=" bg-teal-50 flex flex-start max-w-xl flex-col rounded-xl p-2 h-[24rem] md:h-[32rem] shadow-xl relative 
                    transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-teal-300">
                        <img className="grayscale-[35%]  rounded-lg w-12/12" src="https://source.unsplash.com/6GMq7AGxNbE"/>

                        <div className="relative h-full">
                            <div className="mt-4  flex-col justify-between align-center">
                                <h2 className="text-sm md:text-2xl font-bold text-center">{post.name}</h2>
                                <div className="mt-2 text-sm justify-self-end text-center italic">{post.kind}</div>
                            </div>

                            <div className="mx-auto min-h-[1%] w-2/6  h-0.5 self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                            <div className="px-4 w-full text-gray-700 flex justify-center absolute top-1/2 transform  h-3/6">        
                                <span className="font-black text-sm md:text-xl text-center">{post.content}</span>
                            </div> 
                            <div className="absolute bottom-0 flex flex-row">
                                <svg className="h-6 w-6 text-teal-600 stroke-2" fill="none" stroke="currentColor"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
                                </svg>
                                <span className="inline">{post.location.name}</span>
                            </div>
                        </div>
                    
                    </article>
                ))}
            </div>
            
        </div>
        )
    );
}
