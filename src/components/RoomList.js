import React, { useState, useEffect } from "react";
import { socket } from "../services/socket";

function RoomList({ joinRoom }) {
    const [rooms, setRooms] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Listen for updated room list
        socket.on("roomsUpdated", (updatedRooms) => {
            setRooms(updatedRooms);
        });

        return () => socket.off("roomsUpdated");
    }, []);

    const handleJoinRoom = (roomName) => {
        if (!username.trim()) {
            alert("Please enter your name before joining.");
            return;
        }
        joinRoom(roomName, username);
    };

    return (
        <div className="form-container">
            <label>Join a Room</label>
            <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <ul className="room-list">
                {rooms.map((room, index) => (
                    <li key={index}>
                        {room}
                        <button
                            className="button-primary"
                            onClick={() => handleJoinRoom(room)}
                        >
                            Join
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoomList;
