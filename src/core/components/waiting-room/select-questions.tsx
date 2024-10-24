import classNames from "classnames";
import { useCallback, useState } from "react";
import { Question, Room } from "../../types/room";

export const SelectQuestions: React.FC<{
  questions: Question[];
  onNext: (_value?: string[]) => void;
  round: number;
  room: Room;
}> = ({ questions, onNext, round, room }) => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const handleAddQuestion = useCallback(
    (questionId: string) => {
      const questions = [...selectedQuestions, questionId];
      setSelectedQuestions(questions);

      if (questions.length <= room.rounds) {
        onNext(questions); // Passe la question sélectionnée pour l'avancement
      }
    },
    [onNext, room.rounds, selectedQuestions]
  );

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      <h2 className="text-3xl ">Round {round} :</h2>
      <div className="grid grid-cols-[400px_400px_400px] gap-10">
        {questions.map((q, index) => (
          <QuestionItem
            key={index}
            question={q}
            index={index}
            onVote={handleAddQuestion}
          />
        ))}
      </div>
    </div>
  );
};

const QuestionItem: React.FC<{
  question: Question;
  index: number;
  onVote: (_value: string) => void;
}> = ({ question, index, onVote }) => {
  const handleClick = useCallback(() => {
    onVote(question._id); // Passe l'ID de la question sélectionnée
  }, [onVote, question]);

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "relative flex flex-col justify-center items-center gap-4 cursor-pointer",
        {
          "mb-40": index === 0 || index === 2,
          "mt-40": index === 1,
        }
      )}
    >
      <div className="flex flex-col items-center justify-center text-center border-2 border-black bg-white rounded-[20px] w-full h-[200px] ">
        <p className="text-[28px] italic font-inter font-semibold">
          {question.question}
        </p>

        <p className="text-3xl font-light font-inter">{question.answer}</p>
      </div>
    </div>
  );
};
