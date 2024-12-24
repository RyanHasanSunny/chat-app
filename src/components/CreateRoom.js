import React, { useState } from "react";
import { socket } from "../services/socket";

function CreateRoom() {
    const [roomName, setRoomName] = useState("");

    const handleCreateRoom = () => {
        if (roomName.trim()) {
            socket.emit("createRoom", roomName); // Emit event to create a new room
            setRoomName(""); // Clear input
        } else {
            alert("Room name cannot be empty.");
        }
    };

    return (
        <div className="form-container">
            <label>Create a Room</label>
            <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <button className="button-primary" onClick={handleCreateRoom}>
                Create Room
            </button>
        </div>
    );
}

export default CreateRoom;
