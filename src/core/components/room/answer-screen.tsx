import { useCallback, useEffect, useState } from "react";
import { UserItem } from "../../../pages/waiting-room";
import { useWebSocket } from "../../hook/use-wss";
import { useApp } from "../../hook/use-app";
import { OutlinedButton } from "../../ui/buttons";

interface Answer {
  type: string;
  question: {
    question: string;
    answer: string;
  };
  results: [
    {
      playerId: string;
      word: {
        word: string;
        validated: boolean;
      };
      username: string;
    }
  ];
}

export const ValideAnswers: React.FC<{
  onNext: () => void;
}> = () => {
  const [playersAnswers, setPlayersAnswers] = useState<Answer | null>(null);

  const { ws, isConnected } = useWebSocket();
  const { roomCode, adminId } = useApp();

  useEffect(() => {
    if (ws && isConnected) {
      ws.send(
        JSON.stringify({
          type: "getRoundResults",
          code: roomCode,
          adminId,
        })
      );

      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type === "roundResults") {
          setPlayersAnswers(data);
        }
      };
    }
  }, [roomCode, adminId, isConnected, ws]);

  const handleValidate = useCallback(
    (playerId: string, validated: boolean) => {
      if (ws) {
        ws.send(
          JSON.stringify({
            type: "validateWord",
            validated,
            playerId,
            adminId,
            roomCode,
          })
        );

        console.log("Message envoyé", {
          type: "validateWord",
          validated,
          playerId,
          adminId,
          roomCode,
        });

        ws.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          console.log("Message reçu", data);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [adminId, roomCode]
  );

  const handleNextRound = useCallback(() => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "nextRound",
          adminId,
          roomCode,
        })
      );

      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log("Message reçu", data);
      };
    }
  }, [adminId, roomCode, ws]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-10 w-full px-6 ">
      <h2 className="text-3xl font-bold">Round 1 :</h2>

      {/* Question et réponse */}
      <div className="flex flex-col items-center text-center gap-4">
        <p className="text-2xl font-light font-inter">
          {playersAnswers?.question.question}
        </p>
        <p className="text-3xl italic font-inter font-semibold">
          {playersAnswers?.question.answer}
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-8 mb-8 overflow-y-auto">
        {playersAnswers?.results.map((answer, index) => (
          <div
            key={index}
            className="max-w-[400px] w-full flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg gap-4"
          >
            <UserItem name={answer.username} />
            <div className="border-2 border-black bg-white rounded-lg w-full h-16 flex items-center justify-center p-2">
              <p className="text-lg font-inter">{answer.word.word}</p>
            </div>

            {/* Boutons pour valider ou invalider la réponse */}
            <div className="flex gap-4 mt-2">
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                onClick={() => handleValidate(answer.playerId, true)}
              >
                O
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
                onClick={() => handleValidate(answer.playerId, false)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <OutlinedButton label="Prochain round" onClick={handleNextRound} />
    </div>
  );
};
