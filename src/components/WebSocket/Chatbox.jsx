import React from "react";

function ChatBox({ messages }) {
    return (
        <div className="mb-4 rounded-lg border border-gray-400 px-4 py-2">
            {messages.map((message) => (
                <div key={message.id} className="mb-2 flex">
                    <div className="mr-2 font-bold">
                        {message.sender}
                        :
                    </div>
                    <div>{message.content}</div>
                </div>
            ))}
        </div>
    );
}

export default ChatBox;
