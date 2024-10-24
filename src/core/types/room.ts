export interface Answer {
  name: string;
  answer: string;
  valided: {
    [key: string]: boolean;
  };
}

export interface Question {
  _id: string;
  question: string;
  answer: string;
}

export type RoundQuestions = Question[][];

export interface Room {
  code: { type: string; unique: true };
  admin: {
    id: string;
    username: string;
  };
  players: Player[];
  gameMode: string;
  difficulty: string;
  rounds: number;
  questions: Question[];
  currentRound: number;
}

export interface Player {
  id: string;
  username: string;
}
