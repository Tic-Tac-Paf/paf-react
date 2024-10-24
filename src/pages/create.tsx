import React, { useCallback, useEffect, useState } from "react";
import { OutlinedButton } from "../core/ui/buttons";
import UserIcon from "../assets/img/user-icon";
import { useNavigate } from "react-router-dom";
import { SelectInput, SelectOption, TextInput } from "../core/ui/form-inputs";
import { useWebSocket } from "../core/hook/use-wss";

import { ToastContainer, toast } from "react-toastify";
import { useApp } from "../core/hook/use-app";

const gameModes: SelectOption[] = [
  {
    label: "Choisir un mode",
    value: "",
  },
  {
    label: "Trouver le bon mot",
    value: "findWord",
  },
  {
    label: "Ecrire des mots",
    value: "writeWord",
  },
];

export const CreateScreen: React.FC = () => {
  const navigate = useNavigate();
  const { ws } = useWebSocket(); // Utilisation du WebSocket via le Provider
  const { adminId } = useApp();

  const [name, setName] = useState("");
  const [gameMode, setGameMode] = useState("");

  useEffect(() => {
    localStorage.removeItem("roomCode");
    localStorage.removeItem("playerId");

    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        console.log({ data });

        if (data.type === "roomCreated") {
          localStorage.setItem("playerId", data.additionalData.playerId);
          localStorage.setItem("roomCode", data.room.code);
          navigate(`/waiting-room`);
        }
      };
    }
  }, [ws, navigate]);

  const handleCreateRoom = useCallback(() => {
    if (!name || !gameMode) {
      return toast.error("Veuillez remplir tous les champs");
    }

    if (ws) {
      ws.send(
        JSON.stringify({
          type: "createRoom",
          username: name,
          gameMode: gameMode,
          playerId: adminId,
        })
      );
    }
  }, [name, gameMode, ws, adminId]);

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

      <div className="absolute">
        <ToastContainer />
      </div>
    </div>
  );
};
