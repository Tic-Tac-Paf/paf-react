import { answers } from "../../../assets/mocks/room";
import { admins } from "../../../assets/mocks/users";
import { UserItem } from "../../../pages/waiting-room";
import { Answer, Question } from "../../types/room";

export const ValideAnswers: React.FC<{
  question: Question;
}> = ({ question }) => {
  return (
    <div className="flex flex-col items-center gap-10 h-full w-full">
      <h2 className="text-3xl">Round 1 :</h2>

      {/* Question et réponse */}
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-[28px] italic font-inter font-semibold">
          {question.question}
        </p>
        <p className="text-3xl font-light font-inter">{question.answer}</p>
      </div>

      {/* Afficher les réponses des joueurs en haut */}
      <div className="w-[95%] grid justify-items-end">
        <div className=" max-w-[80%] grid grid-cols-5 gap-5">
          {answers.map((answer, index) => (
            <div key={index} className="flex flex-col items-center">
              <UserItem name={answer.name} />
              <div className="border-2 border-black bg-white rounded-[10px] w-[170px] h-[50px] flex items-center justify-center p-2">
                <p className="text-[20px] font-inter">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section des admins et boutons */}
      <div className="w-[95%] grid grid-cols-6 gap-5 justify-items-center">
        {/* Liste des admins */}
        <div className="w-[95%] grid justify-items-start">
          <div className="max-w-[20%] flex flex-col justify-center items-start gap-4">
            {admins.map((admin, index) => (
              <p key={index} className="text-xl font-semibold">
                {admin}
              </p>
            ))}
          </div>
        </div>

        {/* Boutons pour chaque réponse */}
        {answers.map((answer, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 justify-center items-center"
          >
            {admins.map((admin, adminIndex) => (
              <AdminButtons key={adminIndex} admin={admin} answer={answer} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminButtons: React.FC<{
  admin: string;
  answer: Answer;
}> = ({ admin, answer }) => {
  return (
    <div className="flex gap-2">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-full"
        onClick={() => handleValidate(admin, answer.name)}
      >
        O
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-full"
        onClick={() => handleInvalidate(admin, answer.name)}
      >
        X
      </button>
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
