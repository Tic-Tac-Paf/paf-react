import { useEffect, useState } from "react";

export const useApp = () => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [adminId, setAdminId] = useState<string>("");

  useEffect(() => {
    const storedAdminId = localStorage.getItem("playerId");
    const storedRoomCode = localStorage.getItem("roomCode");

    if (storedAdminId) {
      setAdminId(storedAdminId);
    }

    if (storedRoomCode) {
      setRoomCode(storedRoomCode);
    }
  }, []); // Ce useEffect s'exécute une seule fois au montage du composant

  return { roomCode, adminId };
};
