import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getUserPosts, updateUser } from "../api/users";
import { useAuth } from "../hooks/useAuth";
import axiosClient from "../utils/axiosClient";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { username } = useParams();
    console.log("username", username);

    useEffect(() => {
        if (!user) return;
        console.log("profile page");

        const getPosts = async () => {
            try {
                console.log("user", user);
                const { data } = await getUserPosts(user.id);
                console.log("data", data);
            } catch (error) {
                console.log("error", error);
            }
        };

        getPosts();
    }, [user]);

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
            <div className="mx-auto flex max-w-xl items-center justify-between">
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
                <form>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => {
                            setUser({
                                ...user,
                                name: e.target.value,
                            });
                        }}
                    />
                    <button onClick={onProfileUpdate}>
                        Save
                    </button>
                </form>
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
        )
    );
}

export default Profile;
