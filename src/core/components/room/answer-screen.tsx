import { useCallback, useEffect, useState } from "react";
import { UserItem } from "../../../pages/waiting-room";
import { useWebSocket } from "../../hook/use-wss";
import { useApp } from "../../hook/use-app";
import { OutlinedButton } from "../../ui/buttons";
import classNames from "classnames";

interface Result {
  word: string;
  validated: boolean;
}
interface Answer {
  type: string;
  question: {
    question: string;
    answer: string;
  };
  results: [
    {
      playerId: string;
      word: string;
      validated: boolean;
      username: string;
    }
  ];
}

export const ValideAnswers: React.FC<{
  onNext: () => void;
  currentRound: number;
}> = ({ onNext, currentRound }) => {
  const [playersAnswers, setPlayersAnswers] = useState<Answer | null>(null);
  const [allValidated, setAllValidated] = useState(false);

  const { ws, isConnected } = useWebSocket();
  const { roomCode, adminId } = useApp();

  useEffect(() => {
    if (ws && isConnected) {
      ws.send(
        JSON.stringify({
          type: "getRoundResults",
          roomCode,
          adminId,
        })
      );

      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.type === "roundResults") {
          return setPlayersAnswers(data);
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

        ws.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          if (data.type === "wordValidated") {
            setPlayersAnswers((prevAnswers) => {
              if (!prevAnswers) return null;
              return {
                ...prevAnswers,
                results: data.results,
              };
            });

            setAllValidated(
              Object.values(data.results).every(
                (result) => "validated" in (result as Result)
              )
            );
          }
        };
      }
    },

    [adminId, roomCode, ws]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-10 w-full px-6 ">
      <h2 className="text-3xl font-bold">Round {currentRound} :</h2>

      {/* Question et réponse */}
      <div className="flex flex-col items-center text-center gap-4">
        <p className="text-2xl font-light font-inter">
          {playersAnswers?.question.question}
        </p>
        <p className="text-3xl italic font-inter font-semibold">
          {playersAnswers?.question.answer}
        </p>
      </div>

      <div className="w-full grid grid-cols-3 justify-items-center mb-8 overflow-y-auto">
        {playersAnswers?.results.map((answer, index) => (
          <div
            key={index}
            className="max-w-[400px] w-full flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg gap-4"
          >
            <UserItem name={answer.username} />
            <div className="border-2 border-black bg-white rounded-lg w-full h-16 flex items-center justify-center p-2">
              <p className="text-lg font-inter">{answer.word}</p>
            </div>

            {/* Boutons pour valider ou invalider la réponse */}
            <div className="flex gap-4 mt-2">
              <button
                className={classNames(
                  "border w-[40px] h-[40px] flex items-center justify-center rounded-[10px] border-green-500 hover:bg-green-600 hover:text-white transition",
                  {
                    " bg-transparent text-green-500":
                      answer.validated === false ||
                      answer.validated === undefined,
                    "bg-green-500 text-white": answer.validated === true,
                  }
                )}
                onClick={() => handleValidate(answer.playerId, true)}
                disabled={answer.validated === true}
              >
                O
              </button>
              <button
                className={classNames(
                  "border w-[40px] h-[40px] flex items-center justify-center rounded-[10px] hover:bg-red-600 hover:text-white transition",
                  {
                    // if validated is true or answer.validated dont exit
                    "border-red-500 bg-transparent text-red-500":
                      answer.validated === true ||
                      answer.validated === undefined,
                    "bg-red-500 text-white": answer.validated === false,
                  }
                )}
                onClick={() =>
                  answer.validated === false
                    ? undefined
                    : handleValidate(answer.playerId, false)
                }
                disabled={answer.validated === false}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <OutlinedButton
        label="Prochain round"
        onClick={onNext}
        disabled={!allValidated}
      />
    </div>
  );
};
