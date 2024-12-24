import React, { useState } from "react";
import { socket } from "../services/socket";
import "./styles.css";

function CreateRoom() {
    const [roomName, setRoomName] = useState("");

    const handleCreateRoom = () => {
        if (roomName.trim()) {
            socket.emit("createRoom", roomName); // Emit the createRoom event
            setRoomName(""); // Clear the input field
        } else {
            alert("Room name cannot be empty.");
        }
    };

    return (
        <div className="Createroom">
            <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />

           
           <button className="button" onClick={handleCreateRoom}>Create Room</button>
            
        </div>
    );
}

export default CreateRoom;
