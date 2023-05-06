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
        <div className="h-screen w-screen bg-[url('https://source.unsplash.com/OTy0mkqc2Yk')] bg-no-repeat bg-cover bg-center bg-fixed -z-50 top-0 right-0  absolute"></div>
        <div className="h-screen w-screen bg-[url('https://source.unsplash.com/OTy0mkqc2Yk')] bg-no-repeat bg-cover bg-center bg-fixed -z-50 top-0 left-0   absolute"></div>
        <div className="container relative h-[660px] w-screen">
            <div className="flex flex-row ml-32 mr-20 w-full h-full backdrop-blur-sm">

                <div className="mx-auto flex flex-col w-56 border-2 border-r-0">
                    <div className="mb-4 text-2xl font-bold pt-2 pl-2">Receivers</div>
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
        </div>
        </>
    );
    
}

export default ChatPage;
