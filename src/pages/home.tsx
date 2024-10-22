import React from "react";
import { OutlinedButton } from "../core/ui/buttons";
import { useNavigate } from "react-router-dom";

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full w-full">
      <img
        src="/images/transparent-logo.png"
        alt="logo"
        className="w-[350px] h-auto -mb-10"
      />

      <h1 className="text-[96px]">Tic Tac Paf</h1>

      <div className="flex items-center justify-center gap-10 ">
        <OutlinedButton
          label="Démarrer une partie"
          onClick={() => navigate("create")}
        />
      </div>
    </div>
  );
};
