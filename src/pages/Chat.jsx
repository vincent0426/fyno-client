import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ChatBox from "../components/WebSocket/Chatbox";
import WebSocketComponent from "../components/WebSocket/WebSocketComponent";
import axiosClient from "../utils/axiosClient";

function ChatPage() {
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    const [messageUsers, setMessageUsers] = useState(null);

    const handleReceiverChange = (id) => {
        console.log("id", id);
        setSelectedReceiver(id);
    };

    useEffect(() => {
        console.log("chat page");

        const getMessageUserGroups = async () => {
            try {
                const { data } = await axiosClient.get("/api/messages/user_groups");
                console.log("message user groups", data);
                setMessageUsers(data);
                setSelectedReceiver(data[0].id);
            } catch (error) {
                console.log("error", error);
            }
        };

        getMessageUserGroups();
    }, []);

    return (
        <>
            <div className="absolute right-0 top-0 -z-50 h-screen w-screen bg-[url('https://source.unsplash.com/OTy0mkqc2Yk')] bg-cover bg-fixed bg-center  bg-no-repeat" />
            <div className="absolute left-0 top-0 -z-50 h-screen w-screen bg-[url('https://source.unsplash.com/OTy0mkqc2Yk')] bg-cover bg-fixed bg-center   bg-no-repeat" />
            <div className="container relative h-[660px] w-screen">
                <div className="ml-32 mr-20 flex h-full w-full flex-row backdrop-blur-sm">

                    <div className="mx-auto flex w-56 flex-col border-2 border-r-0">
                        <div className="mb-4 pl-2 pt-2 text-2xl font-bold">Receivers</div>
                        <ul>
                            {messageUsers && messageUsers.map((messageUser) => (
                                <li key={messageUser.id}>
                                    <button
                                        className={classNames(
                                            "w-full px-4 py-2 text-left",
                                            selectedReceiver === messageUser.id ? "bg-gray-300" : "bg-white",
                                        )}
                                        type="button"
                                        onClick={() => handleReceiverChange(messageUser.id)}
                                    >
                                        {messageUser.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <WebSocketComponent rid={selectedReceiver} rname="recipient-1" />

                </div>
                <WebSocketComponent rid={selectedReceiver} />
            </div>
        </>
    );
}

export default ChatPage;
