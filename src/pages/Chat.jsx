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
                const { data } = await axiosClient.get("/api/message/user_groups");
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
        <div className="container mx-auto my-4">
            <div className="mx-auto flex max-w-4xl">
                <div className="w-1/4">
                    <h1 className="mb-4 text-2xl font-bold">Receivers</h1>
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
                        {/* <li>
                            <button
                                className={`w-full px-4 py-2 text-left ${
                                    selectedReceiver === "375241f7-8d90-4ee8-a2ee-9b0ff23583d5"
                                        ? "bg-gray-300"
                                        : "bg-white"
                                }`}
                                type="button"
                                onClick={() => setSelectedReceiver("375241f7-8d90-4ee8-a2ee-9b0ff23583d5")}
                            >
                                謝
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full px-4 py-2 text-left ${
                                    selectedReceiver === "2f5c4a5a-f186-4057-af3f-e04876e14a11"
                                        ? "bg-gray-300"
                                        : "bg-white"
                                }`}
                                type="button"
                                onClick={() => setSelectedReceiver("2f5c4a5a-f186-4057-af3f-e04876e14a11")}
                            >
                                Vincent Hsiseh
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full px-4 py-2 text-left ${
                                    selectedReceiver === "123"
                                        ? "bg-gray-300"
                                        : "bg-white"
                                }`}
                                type="button"
                                onClick={() => setSelectedReceiver("123")}
                            >
                                123
                            </button>
                        </li> */}
                    </ul>
                </div>
                {/* <div className="w-3/4 px-4">
                    <h1 className="mb-4 text-2xl font-bold">
                        {selectedRecipient === "recipient-1"
                            ? "Recipient 1"
                            : selectedRecipient === "recipient-2"
                                ? "Recipient 2"
                                : "Recipient 3"}
                    </h1>
                    <ChatBox recipient={selectedRecipient} />
                    <form
                        className="flex justify-between"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage(selectedRecipient, e.target.content.value);
                            e.target.reset();
                        }}
                    >
                        <input
                            className="mr-2 w-2/3 rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                            id="content"
                            placeholder="Message"
                            type="text"
                        />
                        <button
                            className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </div> */}
            </div>
            <WebSocketComponent rid={selectedReceiver} rname="recipient-1" />
        </div>
    );
}

export default ChatPage;
