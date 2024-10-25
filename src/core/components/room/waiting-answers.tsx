import { useEffect, useState } from "react";

export const WaitingAnswers: React.FC<{
  onNext: () => void;
  currentRound: number;
}> = ({ onNext, currentRound }) => {
  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      <h2 className="text-[80px] ">Round {currentRound} :</h2>

      <ProgressSlider duration={10} onNext={onNext} />
      <h2 className="text-5xl text-center w-[40%] ">
        En attente des réponses des joueurs ...
      </h2>
    </div>
  );
};

const ProgressSlider: React.FC<{
  duration: number;
  onNext: () => void;
}> = ({ duration, onNext }) => {
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) {
        setStartTime(timestamp);
        return;
      }

      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / (duration * 1000)) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        onNext();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [duration, onNext, startTime]);

  return (
    <div className="w-[90%] h-[100px] bg-gray-200 border-2 border-primary rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-l-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
