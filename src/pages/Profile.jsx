import ShowEditButton from "../components/ShowEditButton";
import profiledog from "../images/profiledog.jpg";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getUserPosts, updateUser } from "../api/users";
import { useAuth } from "../hooks/useAuth";
import axiosClient from "../utils/axiosClient";
import { data } from "autoprefixer";

function Profile() {
    const [user, setUser] = useState(null);
    const [myposts, setMyposts] = useState([]);
    const navigate = useNavigate();
    const { username } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    console.log("username", username);

    useEffect(() => {
        if (!user) return;
        console.log("profile page");

        const getPosts = async () => {
            try {
                console.log("user", user);
                const { data } = await getUserPosts(user.id);
                console.log("data", data);
                setMyposts(data.posts)
            } catch (error) {
                console.log("error", error);
            }
        };

        getPosts();
    }, [user]);
    console.log("posts!", myposts[0])

    useEffect(() => {
        console.log("profile page");

        const getUser = async () => {
            try {
                const { data } = await axiosClient.get(`/api/users/name/${username}`);
                setUser(data.user);
            } catch (error) {
                console.log("error", error);
            }
        };

        getUser();
    }, []);

    const onProfileUpdate = async (e) => {
        e.preventDefault();
        console.log("user", user);
        const response = await updateUser(user);

        if (response.status === 200) {
            navigate(`/profile/${user.name}`);
        }
    };

    const onMessageClick = async () => {
        const response = await axiosClient.post("/api/messages/user_groups", {
            message_partner_id: user.id,
        });

        console.log("response", response);
        navigate("/chat");
        navigate(0);
    };

    return (
        user && (
            <>
                <div className="w-full min-h-fit h-[416px] relative bg-gray-300 z-10">
                    <div className="z-20 h-full flex-none w-[1200px] mx-auto" >
                        <div className="h-64 bg-[url('https://source.unsplash.com/KT3WlrL_bsg')] bg-cover bg-top bg-no-repeat w-full" />
                        <div className="flex flex-row h-[160px] w-full">
                            <img className="w-40 h-40 rounded-full ring-4 ring-blue-500/50 translate-x-1/2 -translate-y-1/4" alt="" src={user.avatar_url} />
                            <div className="w-6/12 h-full pl-[100px] pt-[18px] z-30 relative">
                                <input 
                                    readOnly={!isEditing}
                                    className={classNames(
                                        "text-4xl pr-4 pt-2 pb-1 text-left box-border \
                                         absolute top-[14px] w-200px md:w-[270px] lg:w-[360px] xl:w-[400px]",
                                        isEditing
                                            ? "bg-white ring ring-zinc-500/50 hover:scale-105 hover:border-2 "
                                            : "bg-transparent",

                                    )}
                                    value = {user.name}
                                    onChange={(e) => {
                                        setUser({
                                        ...user,
                                        name: e.target.value,
                                        });
                                    }}
                                />
                                <input 
                                    readOnly={!isEditing}
                                    className={classNames(
                                        "italic text-lg break-words absolute bottom-[56px] px-4 text-gray-600\
                                        w-200px md:w-[270px] lg:w-[360px] xl:w-[400px] shadow-xl",
                                        isEditing
                                            ? "bg-white ring ring-zinc-500/50 hover:border-2 hover:scale-105"
                                            : "bg-transparent",

                                    )}
                                    value = {user.signature}
                                    onChange={(e) => {
                                        setUser({
                                        ...user,
                                        signature: e.target.value,
                                        });
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div> 

                <ShowEditButton isEditing={isEditing} setIsEditing={setIsEditing} 
                                    onProfileUpdate={onProfileUpdate}/>
                <button
                    className={classNames(
                        "z-50 absolute right-[80px] top-[440px] h-12 w-12 text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center min-w-[140px] w-1/5 justify-center lg:top-[460px] lg:right-[160px]"
                    )}
                    type="button"
                    onClick={onMessageClick}
                >
                    <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
                    進入聊天
                </button>
                <div></div>
                <section className="w-full h-[450px] bg-slate-500 justify-center pt-[15px]">
                    <div className="w-11/12 bg-gray-100 h-[420px] mx-auto flex flex-row rounded-md p-4 lg:w-10/12 xl:w-8/12">
                        <div className="h-full w-[480px] bg-gray-300 z-10 align-center mr-4 flex flex-col">
                            <div className="font-semibold mx-auto justify-center text-4xl m-4">關於我 </div>
                            <div className="italic text-sm break-words px-4 text-gray-600\
                                        mx-auto">{user.email}</div>
                            <textarea
                                readOnly={!isEditing}
                                className={classNames(
                                    "text-lg break-words px-4 py-2 h-[250px] mx-auto text-center mt-4\
                                    w-200px md:w-[270px] lg:w-[360px] xl:w-[400px] shadow-teal-900 shadow-lg\
                                    backdrop-saturate-200",
                                    isEditing
                                        ? "bg-white ring ring-zinc-500/50 hover:border-2 hover:scale-105"
                                        : "bg-transparent",

                                )}
                                value = {user.bio}
                                onChange={(e) => {
                                    setUser({
                                    ...user,
                                    bio: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="h-full w-[300px] md:w-[400px] lg:w-[500px] flex flex-row">
                            <div className="w-4 shrink bg-gray-200"></div>
                            <div className="h-full w-[300px] md:w-[350px] lg:w-[420px] bg-no-repeat bg-cover bg-center rounded-bl-3xl duration-300 origin-top-right hover:-rotate-12 " 
                                style={{ backgroundImage: `url(${profiledog})` }}>
                            </div>
                            <div className="w-4 shrink bg-gray-200"></div>
                        </div>         
                    </div>
                </section>
                <section>
                    <div className="font-semibold mx-auto justify-center text-4xl m-4 text-center">
                        我的所有貼文
                    </div>
                    <div className="mt-4 grid grid-cols-2 place-content-evenly place-items-center gap-x-8 gap-y-4 border-t border-gray-200 p-9 pt-2 lg:grid-cols-3 bg-gray-200">
                        {myposts && myposts.map((post) => (
                            <article
                                key={post.id}
                                className=" flex-start delay-50 relative flex h-[24rem] max-w-xl flex-col rounded-xl bg-teal-50 p-2 shadow-xl
                        transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 md:h-[32rem]"
                            >
                                <img alt="" className="w-12/12  rounded-lg grayscale-[35%]" src="https://source.unsplash.com/6GMq7AGxNbE" />

                                <div className="relative h-full">
                                    <div className="align-center  mt-4 flex-col justify-between">
                                        <h2 className="text-center text-sm font-bold md:text-2xl">{post.name}</h2>
                                        <div className="mt-2 justify-self-end text-center text-sm italic">{post.kind}</div>
                                    </div>

                                    <div className="absolute left-1/2 top-1/3  mx-auto h-0.5 min-h-[1%] w-2/6 -translate-x-1/2 -translate-y-1/2 self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20" />

                                    <div className="absolute top-1/2 flex h-3/6 w-full justify-center px-4 text-gray-700">
                                        <span className="text-center text-sm font-black md:text-xl">{post.content}</span>
                                    </div>
                                    <div className="absolute bottom-0 flex flex-row">
                                        <svg aria-hidden="true" className="h-6 w-6 stroke-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="inline">{post.location.name}</span>
                                    </div>
                                </div>

                            </article>
                        ))}
                    </div>
                </section>

            </>
        )
    );
}

export default Profile;
