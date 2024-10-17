export interface Answer {
  name: string;
  answer: string;
  valided: {
    [key: string]: boolean;
  };
}

export interface Question {
  question: string;
  answer: string;
  vote: number;
}

export interface Room {
  roomId: string;
  gameMode: string;
  users: {
    name: string;
    score: number;
  }[];
  adminId: string;
  adminName: string;
  questions: Question[];
  difficulty: "easy" | "medium" | "hard";
  nbRounds: number;
}
