import { io } from "socket.io-client";

export const socket = io("https://chat-app-v2.glitch.me");

console.log("Socket connected:", socket);