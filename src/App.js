import React, { useState } from "react";
import CreateRoom from "./components/CreateRoom";
import RoomList from "./components/RoomList";
import ChatRoom from "./components/ChatRoom";

function App() {
    const [currentRoom, setCurrentRoom] = useState("");
    const [username, setUsername] = useState("");

    const joinRoom = (roomName, userName) => {
        setCurrentRoom(roomName);
        setUsername(userName);
    };

    return (
        <div className="app-container">
            <h1>Chat App</h1>
            {!currentRoom ? (
                <>
                    <CreateRoom />
                    <RoomList joinRoom={joinRoom} />
                </>
            ) : (
                <ChatRoom roomName={currentRoom} username={username} leaveRoom={() => setCurrentRoom("")} />
            )}
        </div>
    );
}

export default App;
