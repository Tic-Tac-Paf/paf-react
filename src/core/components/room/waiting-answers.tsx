import { useEffect, useState } from "react";
import SpinnerIcon from "../../../assets/img/spinner-icon";
import { useWebSocket } from "../../hook/use-wss";
import { Room } from "../../types/room";
import CheckIcon from "../../../assets/img/check-icon";

export const WaitingAnswers: React.FC<{
  onNext: () => void;
  room: Room;
}> = ({ onNext, room }) => {
  const { ws, isConnected } = useWebSocket();
  const [nbAnswers, setNbAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (ws && isConnected) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "broadcast") {
          setNbAnswers((prev) => [...prev, 1]);
        }
      };
    }
  }, [ws, isConnected, setNbAnswers, nbAnswers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 15000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full w-full">
      <h2 className="text-[80px]">Round {room.currentRound} :</h2>

      <div className="flex flex-row justify-center items-center gap-5">
        {room.players.map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-2"
          >
            {nbAnswers.length > index ? (
              <CheckIcon className="w-[60px] h-[60px] fill-green-500" />
            ) : (
              <SpinnerIcon className="w-[60px] h-[60px] animate-spin fill-primary" />
            )}
          </div>
        ))}
      </div>

      <h2 className="text-5xl text-center w-[60%] mt-5">
        En attente des réponses des joueurs ...
      </h2>
    </div>
  );
};
