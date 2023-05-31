import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axiosClient from "../utils/axiosClient";

function SinglePost() {
    const ref = useRef();

    function scroll(scrollOffset) {
        ref.current.scrollLeft += scrollOffset;
    }

    const [post, setPost] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id: postId } = useParams();
    useEffect(() => {
        console.log("single post page");

        const getPost = async () => {
            try {
                const response = await axiosClient.get(`/api/posts/${postId}`);
                setPost(response.data.post);

                console.log("response", response);
                console.log(response.data.post);
            } catch (error) {
                console.log("error", error);
            }
        };

        getPost();
    }, []);

    const navigate = useNavigate();

    const onMessageClick = async () => {
        const response = await axiosClient.post("/api/messages/user_groups", {
            message_partner_id: post.userID,
        });

        console.log("response", response);
        navigate("/chat");
        navigate(0);
    };

    return (
        post && (
            <div className="bg-emerald-300/[.2] py-5 sm:py-10">
                <div className="mx-auto flex w-11/12 max-w-6xl flex-col items-center justify-center space-y-8 md:flex-row md:items-start md:space-x-4 md:space-y-0 lg:space-x-8">
                    <div className="w-full max-w-md rounded border border-stone-400 bg-white shadow-lg md:w-1/2">
                        <div className="flex h-[300px] w-full items-center justify-center">
                            <img alt="" className="h-[300px] object-cover" src={post.post_images[currentImageIndex].url} />
                        </div>
                        <div className="relative flex border-t border-stone-400">
                            <button
                                aria-label="left-scroll"
                                className="z-10 h-32 bg-emerald-50 opacity-75 hover:bg-emerald-100"
                                onClick={() => {
                                    if (currentImageIndex > 0) {
                                        setCurrentImageIndex(currentImageIndex - 1);
                                    }
                                }}
                            >
                                <FontAwesomeIcon className="mx-1 w-3 text-cyan-700" icon={faArrowLeft} />
                            </button>
                            <div
                                ref={ref}
                                className="flex w-full overflow-auto border-t border-stone-400"
                                style={{
                                    scrollBehavior: "smooth",
                                }}
                            >
                                {post.post_images.map((postImage) => (
                                    <button
                                        key={postImage.rank}
                                        className="relative h-32 w-40 shrink-0 rounded-sm "
                                        onClick={() => setCurrentImageIndex(postImage.rank - 1)}
                                    >
                                        <img
                                            alt=""
                                            className="flex h-full w-full rounded-sm object-cover"
                                            src={postImage.url}
                                        />
                                    </button>
                                ))}
                            </div>
                            <button
                                aria-label="right-scroll"
                                className="absolute right-0 z-10  h-32 bg-emerald-50 opacity-75 hover:bg-emerald-100"
                                onClick={() => {
                                    if (currentImageIndex < post.post_images.length - 1) {
                                        setCurrentImageIndex(currentImageIndex + 1);
                                    }
                                }}
                            >
                                <FontAwesomeIcon className="mx-1 w-3 text-cyan-700" icon={faArrowRight} />
                            </button>
                        </div>
                    </div>
                    <div className="min-h-128 mx-auto flex h-full w-full max-w-xs flex-col justify-between space-y-4 md:w-1/2">
                        <a
                            aria-label="back-to-products"
                            className="font-primary focus:ring-palette-light flex w-full items-center justify-center rounded-sm border border-teal-500 pb-1
  pt-2 text-lg font-semibold leading-relaxed text-teal-500 hover:bg-slate-50 focus:outline-none focus:ring-1"
                            href="/posts"
                        >
                            <FontAwesomeIcon className="mr-2 inline-flex w-4" icon={faArrowLeft} />
                            Back To All Posts
                        </a>
                        <div className=" font-primary">
                            <h1 className="py-2 text-3xl font-extrabold leading-relaxed text-black sm:py-4">
                                Name:
                                {" "}
                                {post.name}
                            </h1>
                            <p className="text-xl font-medium">
                                Description:
                                {" "}
                                {post.content}
                            </p>
                            <div className="px-1 py-4 text-xl font-medium">
                                Category:
                                {" "}
                                {post.category.name}
                                <br />
                                <div className="my-2" />
                                Age:
                                {" "}
                                {post.age}
                                <br />
                                <div className="my-2" />
                                Gender:
                                {" "}
                                {post.gender}
                                <br />
                                <div className="my-2" />
                                Kind:
                                {" "}
                                {post.kind}
                                <br />
                                <div className="my-2" />
                                Location:
                                {" "}
                                {post.location.name}
                            </div>
                            <div className="flex">
                                <div className="mr-8 px-1 py-4 text-xl font-medium">Contact the owner:</div>
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
            </div>
        )

    );
}

export default SinglePost;
