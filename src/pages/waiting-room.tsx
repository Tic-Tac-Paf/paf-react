import React, { useEffect, useState } from "react";
import UserIcon from "../assets/img/user-icon";
import { Room, RoundQuestions } from "../core/types/room";
import { Lobby } from "../core/components/waiting-room/lobby";
import { SelectQuestions } from "../core/components/waiting-room/select-questions";
import { useApp } from "../core/hook/use-app";
import { useWebSocket } from "../core/hook/use-wss";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

type WaitingRoomSteps = "lobby" | "game";

export const WaitingRoomScreen: React.FC = () => {
  const { roomCode, adminId } = useApp();
  const { ws, isConnected } = useWebSocket();
  const naviguate = useNavigate();

  const [step, setStep] = useState<WaitingRoomSteps>("lobby");

  const [room, setRoom] = useState<Room | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [questions, setQuestions] = useState<RoundQuestions>([]);
  const [round, setRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(3);

  useEffect(() => {
    if (ws && roomCode && isConnected) {
      ws.send(JSON.stringify({ type: "getRoomInfo", roomCode }));

      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.type === "roomInfo" && data.room.code === roomCode) {
          setRoom(data.room);
          setIsAdmin(data.room.admin.id === adminId);
        } else if (
          (data.type === "updatedRoom" || data.type === "userJoinedRoom") &&
          data.room.code === roomCode
        ) {
          setRoom(data.room);

          setTotalRounds(data.room.rounds);
        }
      };
    }
  }, [setIsAdmin, roomCode, adminId, ws, isConnected]);

  const handleStartQuestions = () => {
    if (room?.players && room?.players?.length < 2) {
      return toast.error("Il faut au moins 2 joueurs pour lancer la partie");
    }
    if (ws) {
      if (room?.questions?.length === totalRounds) {
        ws.send(
          JSON.stringify({
            type: "startGame",
            roomCode,
            adminId,
          })
        );

        naviguate("/game");
        return;
      }

      ws.send(
        JSON.stringify({
          type: "getQuestionsForRoom",
          roomCode,
          adminId,
        })
      );

      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.type === "questions" && data.roomCode === roomCode) {
          setQuestions(data.questions);
          setStep("game");
        }
      };
    }
  };

  const handleNextRound = (selectedQuestion?: string[]) => {
    if (round < totalRounds) {
      setRound((prevRound) => prevRound + 1);
    } else {
      if (ws) {
        ws.send(
          JSON.stringify({
            type: "updateRoomInfo",
            roomCode,
            adminId,
            key: "questions",
            value: selectedQuestion,
          })
        );

        ws.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          setRoom(data.room);
        };

        setStep("lobby");
      }
    }
  };

  return (
    <>
      {step === "lobby" && room && (
        <Lobby room={room} isAdmin={isAdmin} onNext={handleStartQuestions} />
      )}

      {step === "game" && questions.length > 0 && (
        <SelectQuestions
          questions={questions[round - 1]}
          onNext={handleNextRound}
          round={round}
          room={room as Room}
        />
      )}

      <ToastContainer />
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
