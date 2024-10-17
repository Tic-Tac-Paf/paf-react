import React, { useEffect, useState } from "react";
import { OutlinedButton } from "../core/ui/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { SelectInput, SelectOption, TextInput } from "../core/ui/form-inputs";
import UserIcon from "../assets/img/user-icon";
import { useGetRoom } from "../core/api/use-get-room";

const difficulties: SelectOption[] = [
  { label: "Facile", value: "easy" },
  { label: "Moyen", value: "medium" },
  { label: "Difficile", value: "hard" },
];

export const WaitingRoomScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: room } = useGetRoom();

  // Grouping state in a single object for room state
  const [roomState, setRoomState] = useState({
    difficulty: room?.difficulty || "easy",
    rounds: room?.nbRounds || 1,
  });

  useEffect(() => {
    if (room) {
      setRoomState({
        difficulty: room.difficulty,
        rounds: room.nbRounds,
      });
    }
  }, [room]);

  const handleStartRoom = () => {
    if (room?.users && room?.users?.length < 2) {
      return alert("Il faut au moins 2 joueurs pour commencer");
    }

    if (roomState.rounds < 1 || roomState.rounds > 10) {
      return alert("Le nombre de rounds doit être compris entre 1 et 10");
    }

    navigate(`/room/${id}`);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setRoomState((prevState) => ({
      ...prevState,
      difficulty: e.target.value,
    }));

  const handleRoundsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRoomState((prevState) => ({
      ...prevState,
      rounds: parseInt(e.target.value),
    }));

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      <p className="text-[30px] flex items-center gap-3">
        Code d'accès : <span className="text-[45px] ">{id}</span>
      </p>

      <div className="w-full grid grid-cols-[1fr_1px_1fr] gap-10 ">
        <div className="flex flex-col items-center justify-center gap-14 max-w-[80%] mx-auto w-full">
          {/* DIFFICULTY */}
          <div className="flex justify-between items-center text-left w-full">
            <p className="text-[34px] w-full">Difficulté :</p>
            <SelectInput
              options={difficulties}
              value={roomState.difficulty}
              onChange={handleDifficultyChange}
            />
          </div>

          {/* ROUNDS */}
          <div className="flex justify-between items-center text-center w-full">
            <p className="text-[34px] ">Nombre de rounds : </p>
            <TextInput
              type="number"
              value={roomState.rounds}
              onChange={handleRoundsChange}
              min={1}
              max={10}
              className="w-[100px] h-[50px] text-[24px] text-center"
            />
          </div>

          {/* ADMIN */}
          <div className="text-center flex items-center justify-between gap-5 w-full">
            <p className="text-[34px] ">Admin : </p>
            <div className="grid items-center justify-center gap-10 ">
              <UserItem name={room?.adminName} />
            </div>
          </div>
        </div>
        <div className="h-full w-[1px] bg-black " />

        <div className="flex flex-col items-center justify-center text-center gap-10">
          <p className="text-[34px] ">Participants : {room?.users?.length}/8</p>

          <div className="grid grid-cols-4 items-center justify-center gap-4 w-full ">
            {room?.users?.map((player) => (
              <UserItem key={player.name} name={player.name} />
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
