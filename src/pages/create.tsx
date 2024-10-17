import React, { useEffect, useState } from "react";
import { OutlinedButton } from "../core/ui/buttons";
import UserIcon from "../assets/img/user-icon";
import { useNavigate } from "react-router-dom";
import { SelectInput, SelectOption, TextInput } from "../core/ui/form-inputs";

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

  const [name, setName] = useState("");
  const [gameMode, setGameMode] = useState("");

  useEffect(() => {
    console.log(name);
  }, [name]);

  const handleCreateRoom = () => {
    if (!name || !gameMode) {
      return alert("Veuillez remplir tous les champs");
    }

    alert(
      `Nouvele room créée avec le nom ${name} et le mode de jeu ${gameMode}`
    );
    // create room and return id to navigate
    navigate("/waiting-room/123456");
  };

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
    </div>
  );
};
