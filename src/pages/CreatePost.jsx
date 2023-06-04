import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BeatLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";

import { getPresignedUrl } from "../api/s3";
import ImageUploader from "../components/ImageUploader/ImageUploader";
import { useAuth } from "../hooks/useAuth";
import axiosClient from "../utils/axiosClient";
import { generateFile, generatePostImages } from "../utils/post";

export default function CreatePost() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        kind: "",
        name: "",
        location: "",
        category: "",
        gender: "",
        age: "",
        content: "",
    });

    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);

    const [images, setImages] = useState(null);

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

    const onChange = (selectedOption, type) => {
        console.log(selectedOption, type);
        setSelectedOption((prevState) => ({
            ...prevState,
            [type]: selectedOption,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // Generate a unique ID for each post
        setIsLoading(true);
        const postId = uuidv4();
        console.log("submit", postId);

        let postImages = [];

        // If there are images, upload them to S3
        if (images) {
            postImages = generatePostImages(postImages, images, postId, user);

            const promises = images.map(async (image, index) => {
                const key = `${postId}/${index + 1}`;
                const { data: { url: presignedURL } } = await getPresignedUrl(key);
                console.log(`index: ${index}, presignedURL: ${presignedURL}`);
                const file = await generateFile(image);
                return axios.put(presignedURL, file);
            });

            const responses = await Promise.all(promises);
            console.log("responses", responses);
        } else {
            // If there are no images, set default images
            postImages = [
                {
                    url: "https://source.unsplash.com/6GMq7AGxNbE",
                    rank: 1,
                },
            ];
        }

        console.log(selectedOption);
        console.log(selectedOption.category.value);
        console.log(selectedOption.location.value);
        const requestBody = {
            id: postId,
            age: selectedOption.age,
            content: selectedOption.content,
            gender: selectedOption.gender,
            kind: selectedOption.kind,
            name: selectedOption.name,
            location: {
                id: selectedOption.location.value,
            },
            category: {
                id: selectedOption.category.value,
            },
            // post_images: tempPostImages,
            post_images: postImages,
        };

        const response = await axiosClient.post("/api/posts", requestBody);

        if (response.status === 201) {
            navigate(`/posts/${response.data.postID}`);
            navigate(0);
        }

        setIsLoading(false);
    };

    return (
        <div className="mx-auto flex h-5/6 max-w-5xl
                bg-gradient-to-br from-emerald-300/[.2] to-violet-200"
        >
            <div className="w-1/2">
                <ImageUploader images={images} setImages={setImages} />
            </div>
            <div className="mx-auto w-1/2 max-w-md  px-4 sm:px-6 lg:px-8">
                <div className="py-3">
                    <form>
                        <div className="border-gray-900/10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-6 sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="current-location">
                                        物種:
                                    </label>
                                    <Select
                                        className="flex-1"
                                        id="category"
                                        name="category"
                                        options={categories}
                                        placeholder="選擇物種"
                                        value={selectedOption.category}
                                        onChange={(e) => onChange(
                                            {
                                                value: e.value,
                                                label: e.label,
                                            },
                                            "category",
                                        )}
                                    />
                                </div>
                                <div className="flex w-full items-center gap-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="username">
                                        品種:
                                    </label>
                                    <input
                                        className="block flex-1  rounded-md bg-white
                                         py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                        value={selectedOption.kind}
                                        onChange={(e) => onChange(e.target.value, "kind")}
                                    />
                                </div>
                                <div className="flex items-center gap-6 sm:col-span-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="username">
                                        名字:
                                    </label>
                                    <input
                                        className="block flex-1  rounded-md bg-white
                                        py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                        value={selectedOption.name}
                                        onChange={(e) => onChange(e.target.value, "name")}
                                    />
                                </div>

                                {/* Current Location options */}
                                <div className="flex items-center gap-6 sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="current-location">
                                        目前地址:
                                    </label>
                                    <Select
                                        className="flex-1 bg-white"
                                        id="current-location"
                                        name="current-location"
                                        options={locations}
                                        placeholder="選擇所在縣市"
                                        value={selectedOption.location}
                                        onChange={(e) => onChange(
                                            {
                                                value: e.value,
                                                label: e.label,
                                            },
                                            "location",
                                        )}
                                    />
                                </div>
                                {/* Sex F M Don't know */}
                                <div className="mt-6 flex items-center justify-between gap-6">
                                    <div className="flex gap-4">
                                        <h2>性別</h2>
                                        <div className="flex items-center gap-x-3">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    id="gender-male"
                                                    name="gender"
                                                    type="radio"
                                                    value="M"
                                                    onChange={(e) => onChange(e.target.value, "gender")}
                                                />
                                                <label
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                    htmlFor="gender-male"
                                                >
                                                    M
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    id="gender-female"
                                                    name="gender"
                                                    type="radio"
                                                    value="F"
                                                    onChange={(e) => onChange(e.target.value, "gender")}

                                                />
                                                <label
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                    htmlFor="gender-female"
                                                >
                                                    F
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    id="gender-unknown"
                                                    name="gender"
                                                    type="radio"
                                                    value="N"
                                                    onChange={(e) => onChange(e.target.value, "gender")}

                                                />
                                                <label
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                    htmlFor="gender-unknown"
                                                >
                                                    未知
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* Age */}
                                <div className="flex items-center gap-6 sm:col-span-6">
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="age">
                                        年齡:
                                    </label>
                                    <input
                                        className="block flex-1  rounded-md bg-white
                                        py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                        id="age"
                                        max="100"
                                        min="0"
                                        name="age"
                                        type="number"
                                        value={selectedOption.age}
                                        onChange={(e) => onChange(e.target.value, "age")}
                                    />
                                </div>
                                {/* Content */}
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="content">
                                        更多描述:
                                    </label>
                                    <textarea
                                        className="w-full resize-none rounded-md  bg-white py-1.5  pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                        id="content"
                                        name="content"
                                        rows="6"
                                        value={selectedOption.content}
                                        onChange={(e) => onChange(e.target.value, "content")}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button className="text-sm font-semibold leading-6 text-gray-900" type="button">
                                取消
                            </button>
                            <button
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit"
                                onClick={onSubmit}
                            >
                                {isLoading ? <BeatLoader color="white" size={6} /> : "發佈"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
