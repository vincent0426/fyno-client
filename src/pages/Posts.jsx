import { useEffect, useState } from "react";
import Select from "react-select";

import axiosClient from "../utils/axiosClient";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "transparent",
        border: "2px solid white",
        borderRadius: "0.5rem",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            border: "2px solid #4fd1c5",
        },
    }),
    menu: (provided, state) => ({
        ...provided,
        borderRadius: "0.5rem",
        boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
    }),
    menuList: (provided, state) => ({
        ...provided,
        padding: 0,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#4fd1c5" : null,
        color: state.isSelected ? "white" : null,
        "&:hover": {
            backgroundColor: "#4fd1c5",
            color: "white",
        },
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: "white",
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "white",
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        backgroundColor: "white",
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "white",
        "&:hover": {
            color: "#4fd1c5",
        },
    }),

};

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const onSearch = () => {
        // TODO: search
        // filterSearch with selectedLocation and selectedCategory, update posts
        // if they are null then everything is selected
        const newPosts = posts.filter((post) => {
            if (selectedLocation && selectedCategory) {
                return (
                    post.location.id === selectedLocation.value
                    && post.category.id === selectedCategory.value
                );
            }

            if (selectedLocation) {
                return post.location.id === selectedLocation.value;
            }

            if (selectedCategory) {
                return post.category.id === selectedCategory.value;
            }

            return true;
        });
        setPosts(newPosts);
    };

    // Update posts when selectedLocation or selectedCategory changes
    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data } = await axiosClient.get("/api/posts", {
                    params: {
                        location_id: selectedLocation?.value,
                        category_id: selectedCategory?.value,
                    },
                });
                setPosts(data.posts);
                console.log("data", data);
            } catch (error) {
                console.log("error", error);
            }
        };

        getPosts();
    }, [selectedLocation, selectedCategory]);

    useEffect(() => {
        const getLocations = async () => {
            const response = await axiosClient.get("/api/locations");
            console.log(response.data.locations);

            const options = response.data.locations.map((location) => ({
                value: location.id,
                label: location.name,
            }));

            setLocations(options);
        };

        getLocations();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const response = await axiosClient.get("/api/categories");
            console.log(response.data.categories);

            const options = response.data.categories.map((category) => ({
                value: category.id,
                label: category.name,
            }));

            setCategories(options);
        };

        getCategories();
    }, []);

    return (

        <div className="bg-emerald-300/[.2]  py-5 sm:py-10 ">
            <div className="mx-auto h-96 max-w-7xl bg-[url('https://source.unsplash.com/6GMq7AGxNbE')] bg-cover bg-fixed bg-center bg-no-repeat p-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">開始認養你的下一個寵物！</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        別怕，我們一起回家
                    </p>
                </div>
                <div className="group relative mt-8 h-56 w-2/5 space-y-4 rounded border-4 border-double border-l-teal-950 border-opacity-10 px-10 py-4 hover:backdrop-blur-sm hover:backdrop-grayscale-[.5]">
                    {/* for searching purpose */}
                    <p className="text-xl text-white">依據您的需求搜尋</p>
                    <div className="flex items-center gap-6 sm:col-span-6">
                        <label className="block text-sm font-medium leading-6 text-white" htmlFor="current-location">
                            類別:
                        </label>
                        <Select
                            className="w-10 flex-1"
                            id="category"
                            name="category"
                            options={categories}
                            placeholder="Select a category"
                            styles={customStyles}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                        />
                    </div>
                    <div className="flex items-center gap-6 sm:col-span-6">
                        <label className="block text-sm font-medium leading-6 text-white" htmlFor="current-location">
                            現在位置:
                        </label>
                        <Select
                            className="flex-1"
                            id="current-location"
                            name="current-location"
                            options={locations}
                            placeholder="Select current location"
                            styles={customStyles}
                            value={selectedLocation}
                            onChange={setSelectedLocation}
                        />
                    </div>
                    <button
                        className="invisible absolute bottom-1 right-4 ml-2 animate-bounce rounded-lg border border-slate-700 bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-2.5 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-1 focus:ring-green-300 group-hover:visible"
                        type="submit"
                        onClick={onSearch}
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                        <span className="sr-only">Search</span>
                    </button>

                </div>
            </div>
            {posts && posts.length && (
                <div className="flex-column relative mt-10 flex h-[18rem] justify-evenly md:h-[24rem] md:flex-row">
                    <div>
                        <div className="... absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 truncate text-3xl font-semibold underline decoration-teal-600 decoration-4">您的每日推薦</div>
                    </div>
                    <div className="group absolute right-1/4  top-1/2 h-full w-1/3 -translate-y-1/2">
                        <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            <div className="absolute inset-0">
                                <img alt="" className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src="https://source.unsplash.com/J4itE356ie0" />
                            </div>
                            <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <div className="flex min-h-full flex-col items-center justify-center">
                                    <h1 className="text-3xl font-bold">{posts[0].name}</h1>
                                    <p className="text-lg">{posts[0].kind}</p>
                                    <p className="text-sm">
                                        {posts[0].gender}
                                        ,
                                        {" "}
                                        {posts[0].age}
                                        yr
                                    </p>
                                    <p className="text-base">{posts[0].content}</p>
                                    <a href={`/posts/${posts[0].id}`}><button className="mt-2 rounded-md bg-neutral-800 px-2 py-1 text-sm hover:bg-neutral-900">Read More</button></a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 grid grid-cols-2 place-content-evenly place-items-center gap-x-8 gap-y-4 border-t border-gray-200 p-9 pt-2 lg:grid-cols-3">
                {posts && posts.map((post) => (
                    <a key={post.id} href={`/posts/${post.id}`}>
                        <article
                            className=" flex-start delay-50 relative flex h-[24rem] max-w-xl flex-col rounded-xl bg-teal-50 p-2 shadow-xl
                    transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-teal-300 md:h-[32rem]"
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
                    </a>
                ))}
            </div>

        </div>
    );
}
