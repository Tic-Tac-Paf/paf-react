import React, { useEffect, useState } from "react";
import UserIcon from "../assets/img/user-icon";
import { Question, Room } from "../core/types/room";
import { ToastContainer, toast } from "react-toastify";
import { Lobby } from "../core/components/waiting-room/lobby";
import { SelectQuestions } from "../core/components/waiting-room/select-questions";
import { useApp } from "../core/providers/app-provider";

type WaitingRoomSteps = "lobby" | "game";

export const WaitingRoomScreen: React.FC = () => {
  // const navigate = useNavigate();
  const { roomCode, adminId } = useApp();

  const [step, setStep] = useState<WaitingRoomSteps>("lobby");

  const [room, setRoom] = useState<Room | null>(null); // L'état de la room récupéré via WebSocket
  const [isAdmin, setIsAdmin] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://paf-api.onrender.com");

    if (ws && roomCode) {
      ws.onopen = () => {
        ws.send(JSON.stringify({ type: "getRoomInfo", roomCode }));
      };

      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.type === "roomInfo" && data.room.code === roomCode) {
          setRoom(data.room);
          setIsAdmin(data.room.admin.id === adminId);
        } else if (data.type === "updatedRoom" && data.room.code === roomCode) {
          setRoom(data.room);
        }
      };
    }
  }, [setIsAdmin, roomCode, adminId]);

  const handleStartQuestions = () => {
    if (room?.players && room?.players?.length < 2) {
      return toast.error("Il faut au moins 2 joueurs pour lancer la partie");
    }

    const ws = new WebSocket("wss://paf-api.onrender.com");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({ type: "getQuestionsForRoom", roomCode, adminId })
      );
    };

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "questions" && data.roomCode === roomCode) {
        console.log(data.questions);
        setQuestions(data.questions);
        setStep("game");
      }
    };
  };

  return (
    <>
      {step === "lobby" && room && (
        <Lobby room={room} isAdmin={isAdmin} onNext={handleStartQuestions} />
      )}

      {step === "game" && (
        <SelectQuestions questions={questions} onNext={handleStartQuestions} />
      )}

      <div className="absolute">
        <ToastContainer />
      </div>
    </>
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
