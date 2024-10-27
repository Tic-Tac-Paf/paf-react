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
        onNext(questions);
      }
    },
    [onNext, room.rounds, selectedQuestions]
  );

  return (
    <div className="flex flex-col justify-center md:justify-center items-center gap-10 md:gap-16 h-full w-full">
      <h2 className="text-[80px]">Round {round} :</h2>
      <div className="grid md:grid-cols-[400px_400px_400px] gap-10">
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
    onVote(question._id);
  }, [onVote, question]);

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "relative flex flex-col justify-center items-center gap-4 cursor-pointer",
        {
          "md:mb-40": index === 0 || index === 2,
          "md:mt-40": index === 1,
        }
      )}
    >
      <div className="flex flex-col items-center justify-center text-center border-2 border-black bg-white hover:border-primary rounded-[20px] w-[90%] md:w-full h-[150px] md:h-[200px] ">
        <p className="text-[20px] md:text-[24px] max-w-[75%] italic font-inter font-medium">
          {question.question}
        </p>

        <p className="text-2xl md:text-4xl font-bold font-inter">
          {question.answer}
        </p>
      </div>
    </div>
  );
};
