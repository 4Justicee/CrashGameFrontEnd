"use client"

import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_URL!);

export const SocketContext = createContext(socket);
