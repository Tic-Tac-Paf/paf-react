import React from "react";
import { OutlinedButton } from "../core/ui/buttons";
import { useNavigate } from "react-router-dom";

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full w-full">
      <img
        src="/images/little_logo.png"
        alt="logo"
        className="w-[350px] h-auto -mb-10"
      />

      <h1 className=" text-[96px] font-bold ">TicTacPaf</h1>

      <div className="flex items-center justify-center gap-10 ">
        <OutlinedButton label="Rejoindre" onClick={() => navigate("join")} />
        <OutlinedButton label="Créer" onClick={() => navigate("create")} />
      </div>
    </div>
  );
};
