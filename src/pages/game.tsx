import React, { useEffect, useState } from "react";
import { WaitingAnswers } from "../core/components/room/waiting-answers";
import { ValideAnswers } from "../core/components/room/answer-screen";
import { Room } from "../core/types/room";
import { useWebSocket } from "../core/hook/use-wss";
import { useApp } from "../core/hook/use-app";

export type GameSteps = "waiting" | "valide";

export const GameScreen: React.FC = () => {
  const [step, setStep] = useState<GameSteps>("waiting");
  const [room, setRoom] = useState<Room | null>(null);

  const { ws, isConnected } = useWebSocket();
  const { roomCode, adminId } = useApp();

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    console.log({ room });
  }, [room]);

  useEffect(() => {
    if (ws && roomCode && isConnected) {
      console.log({ type: "getRoomInfo", roomCode });
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

  const handleNextStep = () => {
    if (step === "waiting") {
      setStep("valide");
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      {step === "waiting" && room && (
        <WaitingAnswers
          onNext={handleNextStep}
          currentRound={room.currentRound}
        />
      )}
      {step === "valide" && answers && (
        <ValideAnswers onNext={handleNextStep} />
      )}
    </div>
  );
};
