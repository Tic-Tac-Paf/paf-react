import { Room } from "../../types/room";
import { OutlinedButton } from "../../ui/buttons";

export const GameOver: React.FC<{
  onNext: () => void;
  room: Room;
}> = ({ onNext, room }) => {
  const sortedPlayers = [...room.players].sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col justify-evenly items-center gap-10 h-full w-full p-8">
      <h2 className="text-5xl text-center font-bold w-[40%]">Game Over</h2>

      <div className="flex flex-col gap-4 w-[90%] max-w-3xl bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4">
          <p className="text-2xl font-semibold">Joueur</p>
          <p className="text-2xl font-semibold">Points</p>
        </div>

        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`flex justify-between items-center py-2 px-4 rounded-md text-xl ${
              index === 0
                ? "bg-yellow-300 font-bold"
                : index === 1
                ? "bg-gray-300"
                : index === 2
                ? "bg-yellow-600"
                : "bg-white"
            }`}
          >
            <p>{player.username}</p>
            <p>{player.points}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-10">
        <OutlinedButton label="Démarrer une nouvelle partie" onClick={onNext} />
      </div>
    </div>
  );
};
