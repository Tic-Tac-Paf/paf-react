import React, { useState } from "react";
import { ChoiceQuestion } from "../core/components/room/choice-question";
import { WaitingAnswers } from "../core/components/room/waiting-answers";
import { ValideAnswers } from "../core/components/room/answer-screen";
import { Question } from "../core/types/room";

export type RoomSteps = "choice" | "waiting" | "valide";

export const RoomScreen: React.FC = () => {
  const [step, setStep] = useState<RoomSteps>("choice");

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  const handleNextStep = (question?: Question) => {
    if (step === "choice" && question) {
      setSelectedQuestion(question);
      setStep("waiting");
    } else if (step === "waiting") {
      setStep("valide");
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      {step === "choice" && <ChoiceQuestion onNext={handleNextStep} />}
      {step === "waiting" && <WaitingAnswers onNext={handleNextStep} />}
      {step === "valide" && selectedQuestion && (
        <ValideAnswers question={selectedQuestion} />
      )}
    </div>
  );
};
