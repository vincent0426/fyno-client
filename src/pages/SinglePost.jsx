import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { getUserPosts } from "../api/users";
import classNames from "classnames";

import axiosClient from "../utils/axiosClient";

function SinglePost() {
    const ref = useRef()
    function scroll(scrollOffset) {
        ref.current.scrollLeft += scrollOffset
    }

    const [post, setPost] = useState(null);
    const [postImages, setPostImages] = useState(null);
    const { id: postId } = useParams();
    useEffect(() => {
        console.log("single post page");

        const getPost = async () => {
            try {
                const response = await axiosClient.get(`/api/posts/${postId}`);
                setPost(response.data.post);

                console.log("response", response);
                console.log(response.data.post)
            } catch (error) {
                console.log("error", error);
            }
        };

        getPost();
    }, []);

    const navigate = useNavigate();

    const onMessageClick = async () => {
        const response = post.userID

        console.log("response", response);
        navigate("/chat");
        navigate(0);
    };


    return (
        post && (
            <div className="bg-emerald-300/[.2] py-5 sm:py-10">
                <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
                    <div className="w-full md:w-1/2 max-w-md border border-stone-400 bg-white rounded shadow-lg">
                        <div className="relative h-auto">
                            <img src="https://source.unsplash.com/6GMq7AGxNbE" alt="" className="transform duration-500 ease-in-out hover:scale-105" />
                        </div>
                        <div className="relative flex border-t border-stone-400">
                            <button
                                aria-label="left-scroll"
                                className="h-32 bg-emerald-50 hover:bg-emerald-100  absolute left-0 z-10 opacity-75"
                                onClick={() => scroll(-300)}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="w-3 mx-1 text-cyan-700" />
                            </button>
                            <div ref={ref} style={{ scrollBehavior: "smooth" }} className="flex space-x-1 w-full overflow-auto border-t border-stone-400">
                                <button

                                    className="relative w-40 h-32 flex-shrink-0 rounded-sm "
                                >
                                    <img src="https://source.unsplash.com/6GMq7AGxNbE" alt="" className="transform duration-500 ease-in-out hover:scale-105" />
                                </button>

                            </div>
                            <button
                                aria-label="right-scroll"
                                className="h-32 bg-emerald-50 hover:bg-emerald-100  absolute right-0 z-10 opacity-75"
                                onClick={() => scroll(300)}
                            >
                                <FontAwesomeIcon icon={faArrowRight} className="w-3 mx-1 text-cyan-700" />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
                        <a
                            href="/posts"
                            aria-label="back-to-products"
                            className="border border-teal-500 text-teal-500 text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
  justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-slate-50 rounded-sm"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="w-4 mr-2 inline-flex" />
                            Back To All Posts
                        </a>
                        <div className=" font-primary">
                            <h1 className="leading-relaxed font-extrabold text-3xl text-black py-2 sm:py-4">
                                Name:  {post.name}
                            </h1>
                            <p className="font-medium text-xl">
                                Description:  {post.content}
                            </p>
                            <div className="text-xl font-medium py-4 px-1">
                                Category:  {post.category.name}
                                <br />
                                <div className="my-2"></div>
                                Age: {post.age}
                                <br />
                                <div className="my-2"></div>
                                Gender: {post.gender}
                                <br />
                                <div className="my-2"></div>
                                Kind: {post.kind}
                                <br />
                                <div className="my-2"></div>
                                Location: {post.location.name}
                            </div>
                            <div className="flex">
                                <div className="text-xl font-medium py-4 px-1 mr-8">Contact the owner:</div>
                                <button
                                    className={classNames(
                                        "flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600",
                                        // user.name === username ? "hidden" : "",
                                    )}
                                    type="button"
                                    onClick={onMessageClick}
                                >
                                    <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)

    );
}

export default SinglePost;
