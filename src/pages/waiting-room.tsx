import React, { useCallback, useEffect, useState } from "react";
import { OutlinedButton } from "../core/ui/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { SelectInput, SelectOption, TextInput } from "../core/ui/form-inputs";
import UserIcon from "../assets/img/user-icon";
import { Player, Room } from "../core/types/room";

const difficulties: SelectOption[] = [
  { label: "Facile", value: "easy" },
  { label: "Moyen", value: "medium" },
  { label: "Difficile", value: "hard" },
];

export const WaitingRoomScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Le code de la room
  const playerId = localStorage.getItem("playerId");

  const [room, setRoom] = useState<Room | null>(null); // L'état de la room récupéré via WebSocket

  useEffect(() => {
    const ws = new WebSocket("ws://paf-api.onrender.com");

    if (ws && id) {
      ws.onopen = () => {
        ws.send(JSON.stringify({ type: "getRoomInfo", roomCode: id }));
      };

      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.type === "roomInfo" && data.room.code === id) {
          setRoom(data.room);
        } else if (data.type === "updatedRoom" && data.room.code === id) {
          setRoom(data.room);
        }
      };
    }
  }, [id]);

  const handleUpdateRoom = useCallback(
    (key: "rounds" | "difficulty", value: string | number) => {
      const ws = new WebSocket("ws://paf-api.onrender.com");

      if (typeof value === "number") {
        if (value < 1 || value > 10) {
          return alert("Le nombre de rounds doit être compris entre 1 et 10");
        }
      }

      if (ws) {
        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              type: "updateRoomInfo",
              roomCode: id,
              playerId,
              key,
              value,
            })
          );
        };
      }
    },
    [id, playerId]
  );

  const handleStartRoom = () => {
    if (room?.players && room?.players?.length < 2) {
      return alert("Il faut au moins 2 joueurs pour commencer");
    }

    // Naviguer vers l'écran de la room
    navigate(`/room/${id}`);
  };

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      <p className="text-[30px] flex items-center gap-3">
        Code d'accès : <span className="text-[45px] ">{id}</span>
      </p>

      <div className="w-full grid grid-cols-[1fr_1px_1fr] gap-10">
        {/* Bloc pour la difficulté et le nombre de rounds */}
        <div className="flex flex-col items-center justify-center gap-14 max-w-[80%] mx-auto w-full">
          {/* Difficulté */}
          <div className="flex justify-between items-center text-left w-full">
            <p className="text-[34px] w-full">Difficulté :</p>
            <SelectInput
              options={difficulties}
              value={room?.difficulty}
              onChange={(e) => handleUpdateRoom("difficulty", e.target.value)}
            />
          </div>

          {/* Nombre de rounds */}
          <div className="flex justify-between items-center text-center w-full">
            <p className="text-[34px]">Nombre de rounds :</p>
            <TextInput
              type="number"
              value={room?.rounds}
              onChange={(e) =>
                handleUpdateRoom("rounds", parseInt(e.target.value))
              }
              min={1}
              max={10}
              className="w-[100px] h-[50px] text-[24px] text-center"
            />
          </div>

          {/* Admin */}
          <div className="text-center flex items-center justify-between gap-5 w-full">
            <p className="text-[34px]">Admin :</p>
            <div className="grid items-center justify-center gap-10">
              <UserItem name={room?.admin?.username} />
            </div>
          </div>
        </div>

        <div className="h-full w-[1px] bg-black" />

        {/* Liste des participants */}
        <div className="flex flex-col items-center justify-center text-center gap-10">
          <p className="text-[34px]">
            Participants : {room?.players?.length}/8
          </p>

          <div className="grid grid-cols-4 items-center justify-center gap-4 w-full">
            {room?.players?.map((player: Player) => (
              <UserItem key={player.id} name={player.username} />
            ))}
          </div>
        </div>
      </div>

      <OutlinedButton label="Lancer la partie" onClick={handleStartRoom} />
    </div>
  );
};

export const UserItem: React.FC<{ name?: string }> = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <UserIcon className="w-[60px] h-[60px]" />
      <p className="text-[24px]">{name}</p>
    </div>
  );
};
