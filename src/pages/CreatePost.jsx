import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

import ImageUploader from "../components/ImageUploader/ImageUploader";
import axiosClient from "../utils/axiosClient";
import { supabaseClient } from "../utils/supabase";

const options = [
    {
        value: "qjwesdlmclmlsedw", label: "Chocolate",
    },
    {
        value: "wejxmss;;medq", label: "Strawberry",
    },
    {
        value: "axcpakme;dmwq;", label: "Vanilla",
    },
];

export default function CreatePost() {
    const [selectedOption, setSelectedOption] = useState({
        kind: "",
        name: "",
        location: null,
        category: null,
        gender: "",
        age: "",
        content: "",
    });

    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);

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
        console.log(selectedOption);
        const requestBody = {
            ...selectedOption,
            id: uuidv4(),
            location_id: selectedOption.location.value,
            category_id: selectedOption.category.value,
        };
        console.log(requestBody);
        const { data, error } = await supabaseClient.auth.getSession();
        console.log(data.session.access_token);
        const response = await axiosClient.post("http://localhost:8080/api/posts", requestBody, {
            headers: {
                Authorization: `Bearer ${data.session.access_token}`,
            },
        });

        // TODO: navigate to /posts/:id
        if (response.status === 201) {
            console.log(response.data.postID);
            console.log("success");
        }
    };

    return (
        <div className="mx-auto mt-10 flex max-w-5xl">
            <div className="w-1/2">
                <ImageUploader />
            </div>
            <div className="mx-auto w-1/2 max-w-md bg-white px-4 sm:px-6 lg:px-8">
                <form>
                    <div className="border-gray-900/10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-6 sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="current-location">
                                    Category:
                                </label>
                                <Select
                                    className="flex-1"
                                    id="category"
                                    name="category"
                                    options={categories}
                                    placeholder="Select a category"
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
                                    Kind:
                                </label>
                                <input
                                    className="block flex-1 rounded-md rounded-b-none border-b bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                    value={selectedOption.kind}
                                    onChange={(e) => onChange(e.target.value, "kind")}
                                />
                            </div>
                            <div className="flex items-center gap-6 sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="username">
                                    Name:
                                </label>
                                <input
                                    className="block flex-1 rounded-md rounded-b-none border-b bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                    value={selectedOption.name}
                                    onChange={(e) => onChange(e.target.value, "name")}
                                />
                            </div>

                            {/* Current Location options */}
                            <div className="flex items-center gap-6 sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="current-location">
                                    Current Location:
                                </label>
                                <Select
                                    className="flex-1"
                                    id="current-location"
                                    name="current-location"
                                    options={locations}
                                    placeholder="Select current location"
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
                                    <h2>Gender</h2>
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
                                                Don&apos;t know
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* Age */}
                            <div className="flex items-center gap-6 sm:col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="age">
                                    Age:
                                </label>
                                <input
                                    className="flex rounded-md border bg-transparent py-1.5 pl-1  text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
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
                                    Content:
                                </label>
                                <textarea
                                    className="w-full resize-none rounded-md border bg-transparent py-1.5 pl-1  text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
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
                            Cancel
                        </button>
                        <button
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                            onClick={onSubmit}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
