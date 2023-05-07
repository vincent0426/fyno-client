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
        <div className="w-screen min-w-min-content relative h-[640px]">
            <div className="flex flex-row h-full backdrop-blur-sm ml-[15%] mr-[12%] ">

                <div className="mx-auto flex flex-col w-56 border-2 border-r-0 ">

                    <div className="flex w-full pt-2 mb-4 item-center justify-center">
                        <div className="flex items-center justify-center rounded-2xl text-zinc-700 bg-lime-200/30 h-10 w-10 inline">
                            <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            ></path>
                            </svg>
                        </div>
                        <div className="text-2xl font-bold pt-2 pl-px ml-1">Receivers</div>
                    </div>
                    <ul>
                        {messageUsers && messageUsers.map((messageUser) => (
                            <li key={messageUser.id}>
                                <button
                                    className={classNames(
                                        "w-11/12 px-4 py-2 text-left border-2 mb-1 mx-1.5",
                                        selectedReceiver === messageUser.id 
                                            ? "bg-gray-300 ring ring-zinc-500/50 hover:scale-105" 
                                            : "bg-white hover:scale-105",
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
