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
  }, []);

  return { roomCode, adminId };
};
