import { io } from 'socket.io-client';

let socket;

export function getSocket(auth) {
  if (!socket) {
    const baseURL = import.meta.env.VITE_BACKEND_API_URL;
    socket = io(baseURL, {
      path: '/socket.io',
      transports: ['websocket'],
      auth, // e.g., { username, token }
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });
  } else if (auth && socket.auth?.username !== auth.username) {
    // if user changes (rare), disconnect and recreate
    try { socket.disconnect(); } catch {}
    socket = undefined;
    return getSocket(auth);
  }
  return socket;
}

export function closeSocket() {
  if (socket) {
    socket.disconnect();
    socket = undefined;
  }
}
