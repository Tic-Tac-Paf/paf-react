import { OutlinedButton } from "../../ui/buttons";

export const GameOver: React.FC<{
  onNext: () => void;
}> = ({ onNext }) => {
  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full">
      <h2 className="text-5xl text-center w-[40%] ">Game Over</h2>

      <div className="flex items-center justify-center gap-10 ">
        <OutlinedButton label="Démarrer une partie" onClick={onNext} />
      </div>
    </div>
  );
};
