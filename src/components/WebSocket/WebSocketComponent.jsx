import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAuth } from "../../hooks/useAuth";

function WebSocketComponent({ rid, rname }) {
    const [messageHistory, setMessageHistory] = useState([]);
    // const { username } = useParams();
    const { user } = useAuth();
    console.log("rid", rid);
    const webSocketRef = useRef(null);
    const messageEndRef = useRef(null);

    const handleIncomingMessage = (event) => {
        // Update only if receiver is the current user
        // transform the message into a JSON object
        const parsedMessage = JSON.parse(event.data);

        if ((parsedMessage.sender === user.id && parsedMessage.receiver === rid)
            || (parsedMessage.sender === rid && parsedMessage.receiver === user.id)) {
            setMessageHistory((prev) => [...prev, parsedMessage]);
        }
    };

    const handleWebSocketStateChange = () => {
        if (webSocketRef.current) {
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
        setMessageHistory([]);
        const webSocket = new WebSocket(`ws://${window.location.hostname}:8080/ws/${user.id}`);
        webSocket.addEventListener("open", handleWebSocketStateChange);
        webSocket.addEventListener("close", handleWebSocketStateChange);
        webSocket.addEventListener("message", handleIncomingMessage);
        webSocketRef.current = webSocket;

        return () => {
            webSocket.close();
        };
    }, [rid]);

    useEffect(() => {
        const lastMessage = messageHistory[messageHistory.length - 1];

        if (lastMessage && lastMessage.sender !== user.id) {
            messageEndRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messageHistory]);

    return (
        <>
        <div className="container mx-auto px-4 py-4 border-2 ">
            <div className="mx-auto max-w-xl h-full relative rounded-lg ">
                {messageHistory.map((message, index) => (
                    <div key={message.id} className="my-2 flex justify-between">
                        <div className="font-bold">
                            {message.sender}
                            :
                        </div>
                        <div>{message.content}</div>
                    </div>
                ))}
                <div ref={messageEndRef} />

                <div className="flex flex-row items-center rounded-xl w-full h-14 bg-zinc-200 px-4
                                absolute bottom-0 left-0">
                    <form
                        className="flex w-full"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage(e.target.content.value);
                            e.target.reset();
                        }}
                    >
                        <button className="flex flex-none items-center justify-center text-gray-400 hover:text-gray-600">
                            <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            ></path>
                            </svg>
                        </button>
                        <input
                            className="shrink mr-2 w-3/4 rounded border border-gray-300 p-2 ml-4 focus:border-blue-500 focus:outline-none"
                            id="content"
                            placeholder="Message"
                            type="text"
                        />
                        <div className="flex-none ml-4 flex items-center">
                            <button
                                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                type="submit"
                            >
                                <span>Send</span>
                                <span className="ml-2">
                                <svg
                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            
        </div>
        </>
    );
}

export default WebSocketComponent;
