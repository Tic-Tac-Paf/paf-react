import React, { useState } from "react";
import { OutlinedButton } from "../core/ui/buttons";
import UserIcon from "../assets/img/user-icon";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../core/ui/form-inputs";

export const JoinScreen: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const handleCreateRoom = () => {
    if (!name || !accessCode) {
      return alert("Veuillez remplir tous les champs");
    }

    alert(
      `Rejoindre la room avec le nom ${name} et le code d'accès ${accessCode}`
    );
    // get room with access code and get id to navigate
    navigate(`/waiting-room/${accessCode}`);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full w-full">
      <UserIcon />

      <div className="flex flex-col justify-center items-start gap-1 ">
        <p className=" text-[36px] ">Nom</p>
        <TextInput value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex flex-col justify-center items-start gap-1 ">
        <p className=" text-[36px] ">Code d'accès</p>
        <TextInput
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
      </div>

      <OutlinedButton label="Rejoindre la room" onClick={handleCreateRoom} />
    </div>
  );
};
