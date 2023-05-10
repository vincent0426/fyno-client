import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ChatBox from "../components/WebSocket/Chatbox";
import WebSocketComponent from "../components/WebSocket/WebSocketComponent";
import axiosClient from "../utils/axiosClient";

function ChatPage() {
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    const [messageUsers, setMessageUsers] = useState(null);
    const [groupUserJoined, setGroupUserJoined] = useState(null);

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
            <div className="min-w-min-content relative h-[640px] w-screen">
                <div className="ml-[15%] mr-[12%] flex h-full flex-row backdrop-blur-sm ">

                    <div className="mx-auto flex w-56 flex-col border-2 border-r-0 ">

                        <div className="item-center mb-4 flex w-full justify-center pt-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-200/30 text-zinc-700">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                            <div className="ml-1 pl-px pt-2 text-2xl font-bold">Receivers</div>
                        </div>
                        <ul>
                            {messageUsers && messageUsers.map((messageUser) => (
                                <li key={messageUser.id} className="relative">
                                    <div className={classNames(groupUserJoined && groupUserJoined[messageUser.id]
                                            && "absolute animate-ping -top-2 right-0 w-4 h-4 rounded-full bg-green-400")}
                                    />
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
                    <WebSocketComponent rid={selectedReceiver} setGroupUserJoined={setGroupUserJoined} />
                </div>
            </div>

        </>
    );
}

export default ChatPage;
