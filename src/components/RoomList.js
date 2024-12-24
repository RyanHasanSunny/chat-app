import React, { useState, useEffect } from "react";
import { socket } from "../services/socket";
import "./styles.css";
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
            alert("Please enter your name before joining!");
            return;
        }
        joinRoom(roomName, username); // Pass room and username to the parent component
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <h2>Available Rooms</h2>
            <ul>
                {rooms.map((room, index) => (
                    <li key={index}>
                        {room} <button onClick={() => handleJoinRoom(room)}>Join</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoomList;
