import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import axiosClient from "../utils/axiosClient";

const user = {
    id: "2f5c4a5a-f186-4057-af3f-e04876e14a11",
    name: "vv",
    email: "temp@gmail.com",
};

function Profile() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { user } = useAuth();

    const onMessageClick = () => {
        // TODO: Add the user to current login user's user_messages table
        // TODO: Redirect to /chat
        // /api/message/users
        const response = axiosClient.post("/api/message/users", {
            message_partner_id: user.id,
        });

        console.log("response", response);
        navigate("/chat");
        navigate(0);
    };

    return (
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
    );
}

export default Profile;
