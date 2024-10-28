import React, { useCallback, useEffect, useState } from "react";
import { WaitingAnswers } from "../core/components/room/waiting-answers";
import { ValideAnswers } from "../core/components/room/answer-screen";
import { Room } from "../core/types/room";
import { useWebSocket } from "../core/hook/use-wss";
import { useApp } from "../core/hook/use-app";
import { useNavigate } from "react-router-dom";
import { GameOver } from "../core/components/room/game-over";

export type GameSteps = "waiting" | "valide" | "results";

export const GameScreen: React.FC = () => {
  const [step, setStep] = useState<GameSteps>("waiting");
  const [room, setRoom] = useState<Room | null>(null);
  const naviguate = useNavigate();

  const { ws, isConnected } = useWebSocket();
  const { roomCode, adminId } = useApp();

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (ws && roomCode && isConnected) {
      ws.send(JSON.stringify({ type: "getRoomInfo", roomCode }));

      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.type === "roomInfo" && data.room.code === roomCode) {
          return setRoom(data.room);
        }
        if (data.type === "updatedRoom" && data.room.code === roomCode) {
          return setRoom(data.room);
        }
        if (data.type === "roundResults") {
          setAnswers(data.results);
        }
      };
    }
  }, [roomCode, adminId, ws, isConnected]);

  const handleNextStep = useCallback(() => {
    if (step === "waiting") {
      setStep("valide");
    }

    if (step === "valide") {
      if (ws && isConnected) {
        ws.send(
          JSON.stringify({
            type: "nextRound",
            adminId,
            roomCode,
          })
        );

        ws.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);

          if (data.type === "nextRound") {
            setRoom(data.room);
            return setStep("waiting");
          }
          if (data.type === "gameOver") {
            setRoom(data.room);
            return setStep("results");
          }
        };
      }
    }

    if (step === "results") {
      naviguate("/create");
    }
  }, [step, ws, isConnected, adminId, roomCode, naviguate]);

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      {step === "waiting" && room && (
        <WaitingAnswers onNext={handleNextStep} room={room} />
      )}
      {step === "valide" && answers && (
        <ValideAnswers
          onNext={handleNextStep}
          currentRound={room?.currentRound || 0}
        />
      )}
      {step === "results" && room && (
        <GameOver onNext={handleNextStep} room={room} />
      )}
    </div>
  );
};
