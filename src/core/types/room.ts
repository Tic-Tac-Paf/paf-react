export interface Answer {
  type: string;
  question: {
    question: string;
    answer: string;
  };
  results: [
    {
      playerId: string;
      word: string;
      validated: boolean;
      username: string;
      responseTime: number;
    }
  ];
}

export interface Result {
  word: string;
  validated: boolean;
  responseTime: number;
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
  points: number;
}
