import React, { useState } from "react";
import { OutlinedButton } from "../core/ui/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { SelectInput, SelectOption } from "../core/ui/form-inputs";
import UserIcon from "../assets/user-icon";

const difficulties: SelectOption[] = [
  {
    label: "Facile",
    value: "easy",
  },
  {
    label: "Moyen",
    value: "medium",
  },
  {
    label: "Difficile",
    value: "hard",
  },
];

const admins = ["Rui", "Theo", "Lucas"];
const players = [
  "Maxime",
  "Auceane",
  "Louis",
  "Ilan",
  "Baptiste",
  "Robin",
  "Thomas",
  "Valentin",
];

export const WaitingRoomScreen: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [difficulty, setDifficulty] = useState("");

  const handleStartRoom = () => {
    alert(`Rejoindre la room avec le nom ${name} et le code d'accès ${id}`);
    // get room with access code and get id to navigate
    navigate(`room/:{id}`);
  };

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      <p className="text-[30px] font-bold flex items-center gap-3">
        Code d'accès : <span className="text-[45px] font-bold">{id}</span>
      </p>

      <div className="w-full grid grid-cols-[1fr_1px_1fr] gap-10 ">
        <div className="grid items-center justify-center gap-10 ">
          <div className="grid justify-center items-center gap-5 text-center w-full">
            <p className="text-[34px] font-bold">Difficulté</p>
            <SelectInput
              options={difficulties}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </div>

          <div className="text-center grid gap-5">
            <p className="text-[34px] font-bold">Admins : {admins.length}/3 </p>
            <div className="grid grid-cols-3 items-center justify-center gap-10 ">
              {admins.map((admin) => (
                <UserItem name={admin} />
              ))}
            </div>
          </div>
        </div>
        <div className="h-full w-[1px] bg-black " />

        <div className="flex flex-col items-center justify-center text-center gap-5">
          <p className="text-[34px] font-bold">
            Participants : {players.length}/8{" "}
          </p>

          <div className="grid grid-cols-4 items-center justify-center gap-4 w-full ">
            {players.map((player) => (
              <UserItem name={player} />
            ))}
          </div>
        </div>
      </div>

      <OutlinedButton label="Lancer la partie" onClick={handleStartRoom} />
    </div>
  );
};

export const UserItem: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <UserIcon className="w-[60px] h-[60px] " />
      <p className="text-[24px] font-bold">{name}</p>
    </div>
  );
};
