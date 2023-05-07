import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { getUser } from "../../api/users";
import { useAuth } from "../../hooks/useAuth";

function WebSocketComponent({ rid }) {
    const [messageHistory, setMessageHistory] = useState([]);
    const [groupUser, setGroupUser] = useState(null);
    // const { username } = useParams();
    console.log(messageHistory);
    const { user } = useAuth();
    const webSocketRef = useRef(null);
    const messageEndRef = useRef(null);
    useEffect(() => {
        console.log("WebSocketComponent", rid);

        const getGroupUser = async (id) => {
            if (!id) return;
            const { data: { user } } = await getUser(id);
            setGroupUser(user);
        };

        getGroupUser(rid);
    }, [rid]);

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
        <div className="container mx-auto my-4">
            {groupUser && (
                <div className="mx-auto max-w-lg">
                    {messageHistory.map((message, index) => (
                        <div key={message.id} className="my-2 flex justify-between">
                            {message.sender === user.id ? (

                                <div className="font-bold">
                                    <img alt="" src={user.avatar_url} />
                                    {user.name}
                                    :
                                </div>
                            ) : (
                                <div className="font-bold">
                                    <img alt="" src={groupUser.avatar_url} />
                                    {groupUser.name}
                                    :
                                </div>
                            )}
                            <div>{message.content}</div>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                    <form
                        className="flex justify-between"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage(e.target.content.value);
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
                </div>
            )}
        </div>
    );
}

export default WebSocketComponent;
