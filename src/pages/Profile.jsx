import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import axiosClient from "../utils/axiosClient";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { username } = useParams();
    console.log("username", username);

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

    const onMessageClick = () => {
        const response = axiosClient.post("/api/message/user_groups", {
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
