// WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the context type
interface WebSocketContextType {
  ws: WebSocket | null;
  sendMessage: (message: string) => void;
  isConnected: boolean;
}

// Create the WebSocket context
const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const websocket = new WebSocket("wss://paf-api.onrender.com");
    // const websocket = new WebSocket("ws://localhost:3000");

    websocket.onopen = () => {
      console.log("Connected to the server");

      setIsConnected(true);
    };

    websocket.onclose = () => {
      setIsConnected(false);
    };

    websocket.onmessage = (message) => {
      console.log("Received message:", message.data);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (ws && isConnected) {
      ws.send(message);
    }
  };

  return (
    <WebSocketContext.Provider value={{ ws, sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
