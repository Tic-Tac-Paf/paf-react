import React, { useState, useEffect } from "react";
import { OutlinedButton } from "../core/ui/buttons";
import UserIcon from "../assets/img/user-icon";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../core/ui/form-inputs";
import { useWebSocket } from "../core/hook/use-wss";
import { useApp } from "../core/hook/use-app";

export const JoinScreen: React.FC = () => {
  const navigate = useNavigate();
  const { ws } = useWebSocket(); // Récupérer la connexion WebSocket depuis le contexte
  const { adminId } = useApp();

  const [name, setName] = useState("");
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    localStorage.removeItem("roomCode");

    if (!ws) return;

    // Ecouter les messages pour confirmer la connexion à la room
    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "userJoinedRoom" && data.room.code === accessCode) {
        localStorage.setItem("playerId", data.playerId);
        localStorage.setItem("roomCode", data.room.code);
        navigate(`/waiting-room`);
      } else if (data.type === "error") {
        alert(data.message); // Afficher l'erreur reçue depuis le serveur
      }
    };
  }, [ws, accessCode, navigate]);

  const handleJoinRoom = () => {
    if (!name || !accessCode) {
      return alert("Veuillez remplir tous les champs");
    }

    if (ws) {
      ws.send(
        JSON.stringify({
          type: "joinRoom",
          roomCode: accessCode,
          username: name,
          playerId: adminId,
        })
      );
    } else {
      alert("La connexion au serveur n'a pas été établie.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full w-full">
      <UserIcon />

      <div className="flex flex-col justify-center items-start gap-1">
        <p className="text-[36px]">Nom</p>
        <TextInput value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex flex-col justify-center items-start gap-1">
        <p className="text-[36px]">Code d'accès</p>
        <TextInput
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
      </div>

      <OutlinedButton label="Rejoindre la room" onClick={handleJoinRoom} />
    </div>
  );
};
