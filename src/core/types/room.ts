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
  code: { type: string; unique: true };
  admin: {
    id: string;
    username: string;
  };
  players: Player[];
  gameMode: string;
  difficulty: string;
  rounds: number;
}

export interface Player {
  id: string;
  username: string;
}
