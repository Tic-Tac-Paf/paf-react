import { answers } from "../../../assets/mocks/room";
import { UserItem } from "../../../pages/waiting-room";
import { Question } from "../../types/room";

export const ValideAnswers: React.FC<{
  question: Question;
}> = ({ question }) => {
  const chunkAnswers = (arr: typeof answers, chunkSize: number) => {
    // Fonction pour diviser les réponses en sous-groupes
    return arr.reduce((acc, _, index) => {
      if (index % chunkSize === 0) {
        acc.push(arr.slice(index, index + chunkSize));
      }
      return acc;
    }, [] as (typeof answers)[]);
  };

  // Diviser les réponses en groupes de 3
  const groupedAnswers = chunkAnswers(answers, 3);

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-10 w-full px-6 ">
      <h2 className="text-3xl font-bold">Round 1 :</h2>

      {/* Question et réponse */}
      <div className="flex flex-col items-center text-center gap-4">
        <p className="text-3xl italic font-inter font-semibold">
          {question.question}
        </p>
        <p className="text-2xl font-light font-inter">{question.answer}</p>
      </div>

      <div className="w-full flex flex-col items-center gap-8 overflow-y-auto">
        {groupedAnswers.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="w-full max-w-7xl flex items-center justify-center gap-8 flex-wrap"
          >
            {group.map((answer, index) => (
              <div
                key={index}
                className="max-w-[400px] w-full flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg gap-4"
              >
                <UserItem name={answer.name} />
                <div className="border-2 border-black bg-white rounded-lg w-full h-16 flex items-center justify-center p-2">
                  <p className="text-lg font-inter">{answer.answer}</p>
                </div>

                {/* Boutons pour valider ou invalider la réponse */}
                <div className="flex gap-4 mt-2">
                  <button
                    className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                    onClick={() => handleValidate("Theo", answer.name)}
                  >
                    O
                  </button>
                  <button
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
                    onClick={() => handleInvalidate("Theo", answer.name)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Placeholder functions to handle button clicks
const handleValidate = (admin: string, answerName: string) => {
  console.log(`${admin} a validé la réponse de ${answerName}`);
};

const handleInvalidate = (admin: string, answerName: string) => {
  console.log(`${admin} a invalidé la réponse de ${answerName}`);
};
