import React, { useCallback, useEffect, useState } from "react";
import { OutlinedButton } from "../core/ui/buttons";
import UserIcon from "../assets/img/user-icon";
import { useNavigate } from "react-router-dom";
import { SelectInput, SelectOption, TextInput } from "../core/ui/form-inputs";
// import { useCreateRoom } from "../core/api/use-create-room";
import { useWebSocket } from "../core/providers/wss-provider";

const gameModes: SelectOption[] = [
  {
    label: "Choisir un mode",
    value: "",
  },
  {
    label: "Trouver le bon mot",
    value: "findWorld",
  },
  {
    label: "Ecrire des mots",
    value: "WriteWords",
  },
];

export const CreateScreen: React.FC = () => {
  const navigate = useNavigate();
  const ws = useWebSocket(); // Utilisation du WebSocket via le Provider

  const [name, setName] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "roomCreated") {
          localStorage.setItem("playerId", data.playerId);
          navigate(`/waiting-room/${data.room.code}`);
        } else if (data.type === "roomNotFound") {
          setMessage("Room not found");
        }
      };
    }
  }, [ws, navigate]);

  const handleCreateRoom = useCallback(() => {
    if (!name || !gameMode) {
      return alert("Veuillez remplir tous les champs");
    }

    if (ws) {
      const playerId = localStorage.getItem("playerId") || "1";

      ws.send(
        JSON.stringify({
          type: "createRoom",
          username: name,
          gameMode: gameMode,
          playerId,
        })
      );
    }
  }, [name, gameMode, ws]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full w-full mx-auto">
      <UserIcon />

      <div className="flex flex-col justify-center items-start gap-1 max-w-[300px] w-full">
        <p className=" text-[36px] ">Nom</p>
        <TextInput value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex flex-col justify-center items-start gap-1 max-w-[300px] w-full">
        <p className=" text-[36px] ">Mode de jeu</p>
        <SelectInput
          options={gameModes}
          value={gameMode}
          onChange={(e) => setGameMode(e.target.value)}
        />
      </div>

      <OutlinedButton label="Créer la room" onClick={handleCreateRoom} />

      <p>{message}</p>
    </div>
  );
};
