import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function WebSocketComponent() {
    const [messageHistory, setMessageHistory] = useState([]);
    const { username } = useParams();
    const webSocketRef = useRef(null);
    const messageEndRef = useRef(null);

    const handleIncomingMessage = (event) => {
        // Update only if receiver is the current user
        // transform the message into a JSON object
        const parsedMessage = JSON.parse(event.data);
        console.log("Received message: ", parsedMessage);

        if (parsedMessage.sender === username || parsedMessage.recipient === username) {
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
                    const newUrl = `ws://${window.location.hostname}:8080/ws/${username}?websocketId=${websocketId}`;
                    window.location.href = `${window.location.origin}?websocketUrl=${newUrl}`;
                }, 5000);
                break;
            default:
                break;
            }
        }
    };

    const handleSendMessage = (recipient, content) => {
        console.log(`Sending message to ${recipient}: ${content}`);
        const message = {
            id: uuidv4(),
            sender: username,
            recipient,
            content,
            createdAt: new Date().toISOString(),
        };

        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
        }
    };

    useEffect(() => {
        const webSocket = new WebSocket(`ws://${window.location.hostname}:8080/ws/${username}`);
        webSocket.addEventListener("open", handleWebSocketStateChange);
        webSocket.addEventListener("close", handleWebSocketStateChange);
        webSocket.addEventListener("message", handleIncomingMessage);
        webSocketRef.current = webSocket;

        return () => {
            webSocket.close();
        };
    }, [username]);

    useEffect(() => {
        const lastMessage = messageHistory[messageHistory.length - 1];

        if (lastMessage && lastMessage.sender !== username) {
            messageEndRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messageHistory, username]);

    return (
        <div className="container mx-auto my-4">
            <div className="mx-auto max-w-lg">
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
                <form
                    className="flex justify-between"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(e.target.recipient.value, e.target.content.value);
                        e.target.reset();
                    }}
                >
                    <input
                        className="mr-2 w-1/3 rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                        id="recipient"
                        placeholder="Recipient"
                        type="text"
                    />
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
        </div>
    );
}

export default WebSocketComponent;
