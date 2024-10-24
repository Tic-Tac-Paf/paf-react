import React, { useCallback, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SelectInput, SelectOption, TextInput } from "../../ui/form-inputs";
import { Player, Room } from "../../types/room";
import { OutlinedButton } from "../../ui/buttons";
import UserIcon from "../../../assets/img/user-icon";
import { useApp } from "../../hook/use-app";
import { useWebSocket } from "../../hook/use-wss";

const difficulties: SelectOption[] = [
  { label: "Facile", value: "easy" },
  { label: "Moyen", value: "medium" },
  { label: "Difficile", value: "hard" },
];

export const Lobby: React.FC<{
  room: Room;
  isAdmin: boolean;
  onNext: () => void;
}> = ({ room, isAdmin, onNext }) => {
  const { roomCode, adminId } = useApp();
  const { ws } = useWebSocket();

  const totalRounds = room?.rounds;

  const isReady = useMemo(() => {
    return room?.questions?.length === totalRounds;
  }, [room, totalRounds]);

  const handleUpdateRoom = useCallback(
    (key: "rounds" | "difficulty", value: string | number) => {
      if (typeof value === "number") {
        if (value < 1 || value > 10) {
          return toast.error(
            "Le nombre de rounds doit être compris entre 1 et 10"
          );
        }
      }

      if (ws) {
        console.log("updateRoom");

        ws.send(
          JSON.stringify({
            type: "updateRoomInfo",
            roomCode,
            adminId,
            key,
            value,
          })
        );
      }
    },

    [roomCode, adminId, ws]
  );

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      <p className="text-[30px] flex items-center gap-3">
        Code d'accès : <span className="text-[45px] ">{roomCode}</span>
      </p>

      <div className="w-full grid grid-cols-[1fr_1px_1fr] gap-10 ">
        {/* Bloc pour la difficulté et le nombre de rounds */}
        <div className="flex flex-col items-center justify-center gap-14 max-w-[90%] ml-auto bg-white/70 p-5 rounded-lg w-full">
          <div className="flex justify-between items-center text-left w-full">
            <p className="text-[34px] w-full">Difficulté :</p>
            {isAdmin && !isReady ? (
              <SelectInput
                options={difficulties}
                value={room?.difficulty}
                onChange={(e) => handleUpdateRoom("difficulty", e.target.value)}
              />
            ) : (
              <p className="text-[24px]">
                {difficulties.find((d) => d.value === room?.difficulty)?.label}
              </p>
            )}
          </div>

          {/* Nombre de rounds */}
          <div className="flex justify-between items-center text-center w-full">
            <p className="text-[34px]">Nombre de rounds :</p>
            {isAdmin && !isReady ? (
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
            ) : (
              <p className="text-[24px]">{room?.rounds}</p>
            )}
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
        <div className="flex flex-col items-center justify-center text-center gap-10 max-w-[90%] bg-white/70 p-5 rounded-lg">
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

      {isAdmin ? (
        <OutlinedButton
          label={isReady ? "Lancer la partie" : "Choix des questions"}
          onClick={onNext}
        />
      ) : (
        <div />
      )}

      <div className="absolute">
        <ToastContainer />
      </div>
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
