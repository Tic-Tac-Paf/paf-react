import { useCallback, useEffect, useState } from "react";
import SpinnerIcon from "../../../assets/img/spinner-icon";
import { useWebSocket } from "../../hook/use-wss";
import { Room } from "../../types/room";
import CheckIcon from "../../../assets/img/check-icon";
import { UserItem } from "../waiting-room/lobby";
import { useApp } from "../../hook/use-app";

export const WaitingAnswers: React.FC<{
  onNext: () => void;
  room: Room;
}> = ({ onNext, room }) => {
  const { ws, isConnected } = useWebSocket();
  const { roomCode, adminId } = useApp();
  const [nbAnswers, setNbAnswers] = useState<number[]>([]);
  const [timer, setTimer] = useState(15);
  const [timeout, setTimeout] = useState(false);

  useEffect(() => {
    if (ws && isConnected) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "broadcast") {
          return setNbAnswers((prev) => [...prev, 1]);
        }

        if (data.type === "roundTimeout") {
          return setTimeout(true);
        }

        if (data.type === "timerUpdate") {
          return setTimer(data.timeLeft);
        }
      };
    }
  }, [ws, isConnected, setNbAnswers, nbAnswers]);

  useEffect(() => {
    if (timeout) {
      onNext();
    }
  }, [timeout, onNext]);

  const handleMalus = useCallback(
    (playerId: string) => {
      if (ws && isConnected) {
        ws.send(
          JSON.stringify({
            type: "blockUserTyping",
            playerId,
            roomCode,
            adminId,
          })
        );
      }
    },
    [ws, isConnected, roomCode, adminId]
  );

  const handleBonus = useCallback(
    (playerId: string) => {
      if (ws && isConnected) {
        ws.send(
          JSON.stringify({
            type: "playerHint",
            playerId,
            roomCode,
            adminId,
          })
        );
      }
    },
    [ws, isConnected, roomCode, adminId]
  );

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full w-full">
      <h2 className="text-[80px]">Round {room.currentRound} :</h2>

      <div className="w-full grid md:grid-cols-3 justify-items-center gap-5 md:gap-0 mb-8 overflow-y-auto">
        {room.players.map((player, index) => (
          <div
            key={index}
            className="max-w-[400px] w-full flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg gap-4"
          >
            <UserItem name={player.username} />

            {nbAnswers.length > index ? (
              <CheckIcon className="w-[60px] h-[60px] fill-green-500" />
            ) : (
              <SpinnerIcon className="w-[60px] h-[60px] animate-spin fill-primary" />
            )}

            <div className="flex gap-4 mt-2">
              {room.gameMode === "findWord" && (
                <button
                  className="border py-2 px-1 flex items-center justify-center bg-transparent fill-green-500 rounded-[10px] border-green-500 hover:bg-green-600 hover:fill-white hover:text-white transition"
                  onClick={() => handleBonus(player.id)}
                >
                  Bonus
                </button>
              )}
              <button
                className="border py-2 px-1 flex items-center justify-center rounded-[10px] border-red-500 bg-transparent fill-red-500 hover:bg-red-600 hover:fill-white hover:text-white transition"
                onClick={() => handleMalus(player.id)}
              >
                Malus
              </button>
            </div>
          </div>
        ))}
      </div>

      <p>{timer} avant la fin du round</p>
    </div>
  );
};
