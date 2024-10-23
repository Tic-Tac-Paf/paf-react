import classNames from "classnames";
import { OutlinedButton } from "../../ui/buttons";
import { useCallback, useState } from "react";
import { Question } from "../../types/room";

export const SelectQuestions: React.FC<{
  questions: Question[];
  onNext: (_value?: Question) => void;
}> = ({ questions }) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);

  const handleVote = useCallback((index: number) => {
    setSelectedQuestionIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  }, []);

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      <h2 className="text-3xl ">Round 1 :</h2>
      <div className="grid grid-cols-[400px_400px_400px] gap-10">
        {questions.map((q, index) => (
          <QuestionItem
            key={index}
            question={q}
            index={index}
            onVote={handleVote}
            isVoted={selectedQuestionIndex !== null}
            isSelected={selectedQuestionIndex === index}
          />
        ))}
      </div>

      {/* slider of 20 secondes */}
      {/* <ProgressSlider duration={10} questions={questions} onNext={onNext} /> */}
    </div>
  );
};

const QuestionItem: React.FC<{
  question: Question;
  index: number;
  onVote: (index: number) => void;
  isVoted: boolean;
  isSelected: boolean;
}> = ({ question, index, onVote, isVoted, isSelected }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(question);

  const handleClick = useCallback(() => {
    if (isSelected) {
      setCurrentQuestion((prev) => ({ ...prev, vote: prev.vote - 1 }));
    } else if (!isVoted) {
      setCurrentQuestion((prev) => ({ ...prev, vote: prev.vote + 1 }));
    }
    onVote(index);
  }, [isVoted, isSelected, index, onVote]);

  return (
    <div
      className={classNames(
        "relative flex flex-col justify-center items-center gap-4",
        {
          "mb-40": index === 0 || index === 2,
          "mt-40": index === 1,
        }
      )}
    >
      <div
        className={classNames(
          "absolute -top-5 -right-5 items-center justify-center bg-primary rounded-full w-[45px] h-[45px] ",
          {
            hidden: currentQuestion.vote === 0,
            flex: currentQuestion.vote !== 0,
          }
        )}
      >
        <p className=" text-white text-[24px] ">{currentQuestion.vote}</p>
      </div>
      <div className="flex flex-col items-center justify-center text-center border-2 border-black bg-white rounded-[20px] w-full h-[200px] ">
        <p className="text-[28px] italic font-inter font-semibold">
          {currentQuestion.question}
        </p>

        <p className="text-3xl font-light font-inter">
          {currentQuestion.answer}
        </p>
      </div>

      <OutlinedButton
        label={isSelected ? "Remove Vote" : "Vote"}
        className={classNames("border text-[20px]", {
          "opacity-50 cursor-not-allowed": isVoted && !isSelected,
        })}
        onClick={handleClick}
        disabled={isVoted && !isSelected}
      />
    </div>
  );
};

// const ProgressSlider: React.FC<{
//   duration: number;
//   questions: Question[];
//   onNext: (_value?: Question) => void;
// }> = ({ duration, questions, onNext }) => {
//   const [progress, setProgress] = useState(0);
//   const [startTime, setStartTime] = useState<number | null>(null);

//   useEffect(() => {
//     let animationFrameId: number;

//     const animate = (timestamp: number) => {
//       if (!startTime) {
//         setStartTime(timestamp);
//         return;
//       }

//       const elapsed = timestamp - startTime;
//       const newProgress = Math.min((elapsed / (duration * 1000)) * 100, 100);

//       setProgress(newProgress);

//       if (newProgress < 100) {
//         animationFrameId = requestAnimationFrame(animate);
//       } else {
//         alertMostVotedQuestion();
//       }
//     };

//     animationFrameId = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animationFrameId);
//   }, [duration, startTime]);

//   const alertMostVotedQuestion = () => {
//     const maxVotes = Math.max(...questions.map((q) => q.vote));
//     const topQuestions = questions.filter((q) => q.vote === maxVotes);

//     const randomQuestion =
//       topQuestions[Math.floor(Math.random() * topQuestions.length)];

//     console.log(randomQuestion);
//     // send question to websocket

//     onNext(randomQuestion);
//   };

//   return (
//     <div className="w-[90%] h-[50px] bg-gray-200 border-2 border-primary rounded-full overflow-hidden">
//       <div
//         className="h-full bg-primary rounded-l-full transition-all"
//         style={{ width: `${progress}%` }}
//       />
//     </div>
//   );
// };
