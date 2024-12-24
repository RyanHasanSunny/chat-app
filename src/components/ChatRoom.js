import React, { useState, useEffect } from "react";
import { socket } from "../services/socket";
import "./styles.css";

function ChatRoom({ roomName, username, leaveRoom }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Join the room with username
        socket.emit("joinRoom", { roomName, username });

        // Load message history
        socket.on("messageHistory", (history) => {
            setMessages(history);
        });

        // Listen for new messages
        socket.on("message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off("messageHistory");
            socket.off("message");
        };
    }, [roomName, username]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", { roomName, message, username });
            setMessage("");
        }
    };

    return (
        <div className="Chat">
        <div className="chatroom-container">
            <div className="chatroom-header">
                <h2>Room: {roomName}</h2>
                <button className="leave-room-button" onClick={leaveRoom}>Leave Room</button>
            </div>
            <div className="chatroom-messages">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`message ${msg.sender === username ? "own-message" : "other-message"}`}
                    >
                        <strong>{msg.sender === username ? "You" : msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="chatroom-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="message-input"
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
        </div>
    );
}

export default ChatRoom;
