import { useEffect, useState } from "react";

import axiosClient from "../utils/axiosClient";

const posts = [
    {
        id: 1,
        title: "Boost your conversion rate",
        href: "#",
        description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
        date: "Mar 16, 2020",
        datetime: "2020-03-16",
        category: {
            title: "Marketing", href: "#",
        },
        author: {
            name: "Michael Foster",
            role: "Co-Founder / CTO",
            href: "#",
            imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
    {
        id: 2,
        title: "Boost your conversion rate",
        href: "#",
        description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
        date: "Mar 16, 2020",
        datetime: "2020-03-16",
        category: {
            title: "Marketing", href: "#",
        },
        author: {
            name: "Michael Foster",
            role: "Co-Founder / CTO",
            href: "#",
            imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
];

export default function Posts() {
    const [posts, setPosts] = useState(null);
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
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                    <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                        {posts && posts.map((post) => (
                            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between rounded-xl p-6 sm:flex-row sm:space-x-6">
                                <a className="inline-block" href={`/posts/${post.id}`}>
                                    {post.name}
                                </a>
                                {/* <div className="flex items-center gap-x-4 text-xs">
                                    <time className="text-gray-500" dateTime={post.datetime}>
                                        {post.date}
                                    </time>
                                    <a
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        href={post.category.href}
                                    >
                                        {post.category.title}
                                    </a>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={post.href}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img alt="" className="h-10 w-10 rounded-full bg-gray-50" src={post.author.imageUrl} />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <a href={post.author.href}>
                                                <span className="absolute inset-0" />
                                                {post.author.name}
                                            </a>
                                        </p>
                                        <p className="text-gray-600">{post.author.role}</p>
                                    </div>
                                </div> */}
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
