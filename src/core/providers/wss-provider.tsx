import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

const WebSocketContext = createContext<WebSocket | null>(null);

export const WssProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://paf-api.onrender.com");

    socket.onopen = () => {
      console.log("Connected to the server");
      setWs(socket);
    };

    socket.onclose = () => {
      console.log("Disconnected from the server");
    };

    return () => {
      socket.close(); // Fermer le WebSocket quand le composant est démonté
    };
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
