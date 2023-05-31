import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { getUser } from "../../api/users";
import { useAuth } from "../../hooks/useAuth";
import axiosClient from "../../utils/axiosClient";

function WebSocketComponent({ rid, setGroupUserJoined }) {
    const [messageHistory, setMessageHistory] = useState([]);
    const [groupUser, setGroupUser] = useState(null);
    // const { username } = useParams();
    console.log(messageHistory);
    const { user } = useAuth();
    const webSocketRef = useRef(null);
    const messageEndRef = useRef(null);
    useEffect(() => {
        console.log("WebSocketComponent", rid);

        const getGroupUser = async (rid) => {
            if (!rid) return;
            const { data: { user } } = await getUser(rid);
            setGroupUser(user);
        };

        getGroupUser(rid);
    }, [rid]);

    useEffect(() => {
        if (!rid) return;

        // Check if another user is already connected to the WebSocket
        const isAnotherUserConnected = async () => {
            try {
                const response = await axiosClient.get(`/ws/connection/${rid}`);
                console.log("isAnotherUserConnected", response);

                if (response.data.connected) {
                    console.log("isAnotherUserConnected", response);
                    setGroupUserJoined(
                        (prev) => ({
                            ...prev, [rid]: true,
                        }),
                    );
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        isAnotherUserConnected();
    }, [rid]);

    const handleIncomingMessage = (event) => {
        // Update only if receiver is the current user
        // transform the message into a JSON object
        const parsedMessage = JSON.parse(event.data);
        console.log("parsedMessage", parsedMessage.type);

        if (parsedMessage.type === "user-join" && parsedMessage.sender === rid) {
            console.log("join");
            setGroupUserJoined(
                (prev) => ({
                    ...prev, [parsedMessage.sender]: true,
                }),
            );

            return;
        }

        if (parsedMessage.type === "user-leave" && parsedMessage.sender === rid) {
            console.log("leave");
            // it's a map {user_id: true/false}
            setGroupUserJoined(
                (prev) => ({
                    ...prev, [parsedMessage.sender]: false,
                }),
            );
            return;
        }

        if ((parsedMessage.sender === user.id && parsedMessage.receiver === rid)
            || (parsedMessage.sender === rid && parsedMessage.receiver === user.id)) {
            setMessageHistory((prev) => [...prev, parsedMessage]);
        }
    };

    const handleLeavePage = () => {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            const message = {
                type: "user-leave",
                sender: user.id,
                receiver: null,
                content: "",
            };
            webSocketRef.current.send(JSON.stringify(message));
        }
    };

    const handleWebSocketStateChange = () => {
        console.log("handleWebSocketStateChange");

        if (webSocketRef.current) {
            console.log("webSocketRef.current", webSocketRef.current);

            switch (webSocketRef.current.readyState) {
            case WebSocket.CONNECTING:
                console.log("WebSocket connecting");
                break;
            case WebSocket.OPEN:
                console.log("WebSocket connected");
                break;
            case WebSocket.CLOSING:
                console.log("WebSocket closing");
                break;
            case WebSocket.CLOSED:
                console.log("WebSocket closed");
                //
                setTimeout(() => {
                    const websocketId = Cookies.get("websocket-id");
                    const newUrl = `ws://${window.location.hostname}:8080/ws/${user.id}?websocketId=${websocketId}`;
                    window.location.href = `${window.location.origin}?websocketUrl=${newUrl}`;
                }, 5000);
                break;
            default:
                break;
            }
        }
    };

    const handleSendMessage = (content) => {
        if (!content) return;
        console.log(`Sending message to ${rid}: ${content}`);
        console.log("user", user);
        const message = {
            id: uuidv4(),
            sender: user.id,
            receiver: rid,
            content,
            createdAt: new Date().toISOString(),
        };

        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
        }
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handleLeavePage);

        return () => {
            window.removeEventListener("beforeunload", handleLeavePage);
        };
    }, []);

    useEffect(() => {
        setMessageHistory([]);
        const webSocket = new WebSocket(`ws://${window.location.hostname}:8080/ws/${user.id}`);
        webSocket.addEventListener("open", handleWebSocketStateChange);
        webSocket.addEventListener("close", handleWebSocketStateChange);
        webSocket.addEventListener("message", handleIncomingMessage);
        webSocketRef.current = webSocket;

        return () => {
            console.log("WebSocketComponent unmounting");
            webSocket.close();
        };
    }, [rid]);

    useEffect(() => {
        const lastMessage = messageHistory[messageHistory.length - 1];

        if (lastMessage && lastMessage.sender !== user.id && messageEndRef.current) {
            messageEndRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messageHistory]);

    return (
        groupUser
        && (
            <div className="container relative min-w-[450px] overflow-y-auto border-2 pb-4 ">
                <div className="sticky top-0 w-full bg-[url('https://source.unsplash.com/YCPkW_r_6uA')] bg-cover bg-center pb-2 pt-4">
                    <div className="mb-4 inline bg-teal-900/80 pl-8 text-3xl font-semibold text-gray-100 backdrop-opacity-10 md:text-4xl ">
                        與
                        <span className="z-10 bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text font-bold text-transparent">{groupUser.name}</span>
                        {" "}
                        的聊天
                    </div>
                </div>
                {groupUser && (
                    <div className="mx-auto w-[95%] max-w-2xl pb-10 pt-6">
                        {messageHistory.map((message, index) => (
                            <div key={message.id}>
                                {message.sender === user.id ? (
                                    <div className="item-center mb-4 flex flex-row justify-end font-bold ">
                                        <div className="item-center mb-2 mr-2 max-w-[65%] rounded-l-3xl rounded-tr-xl bg-gradient-to-r from-sky-500/80 to-blue-500/70 px-4 py-3 text-white">
                                            {message.content}
                                        </div>
                                        <img alt="" className="h-10 w-10 rounded-full" src={user.avatar_url} />
                                    </div>
                                ) : (
                                    <div className="mb-4 flex flex-row justify-start font-bold">
                                        <img alt="" className="h-10 w-10 rounded-full" src={groupUser.avatar_url} />
                                        <div className="ml-2 rounded-r-3xl rounded-tl-xl bg-gray-400 px-4 py-3 text-white">
                                            {message.content}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messageEndRef} />

                    </div>
                )}
                <div className="fixed bottom-4 left-[25%] z-10 flex h-14 w-[70%] flex-row items-center rounded-xl bg-zinc-200 px-4">
                    <form
                        className="mx-auto flex w-full"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage(e.target.content.value);
                            e.target.reset();
                        }}
                    >
                        <input
                            className="ml-4 mr-2 w-3/4 shrink rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                            id="content"
                            placeholder="Message"
                            type="text"
                        />
                        <div className="ml-4 flex flex-none items-center">
                            <button
                                className="flex shrink-0 items-center justify-center rounded-xl bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600"
                                type="submit"
                            >
                                <span>Send</span>
                                <span className="ml-2">
                                    <svg
                                        className="-mt-px h-4 w-4 rotate-45"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default WebSocketComponent;
