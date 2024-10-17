import { Answer, Question } from "../../core/types/room";

export const answers: Answer[] = [
  {
    name: "Maxime",
    answer: "plage",
    valided: {
      rui: true,
      theo: true,
      lucas: true,
    },
  },
  {
    name: "auceane",
    answer: "",
    valided: {
      rui: true,
      theo: true,
      lucas: true,
    },
  },
  {
    name: "louis",
    answer: "dechetterie",
    valided: {
      rui: true,
      theo: true,
      lucas: true,
    },
  },
  {
    name: "robin",
    answer: "plage",
    valided: {
      rui: true,
      theo: true,
      lucas: true,
    },
  },
  {
    name: "baptiste",
    answer: "piscine",
    valided: {
      rui: true,
      theo: true,
      lucas: true,
    },
  },
];

export const questions: Question[] = [
  {
    question: "Endroit où l'on peut trouver des livres",
    answer: "Bibliothèque",
    vote: 0,
  },
  {
    question: "Capitale de la France",
    answer: "Paris",
    vote: 1,
  },
  {
    question: "Endroit où on aime bronzer",
    answer: "Plage",
    vote: 1,
  },
];

export const roomExample = {
  roomId: "12DE23",
  gameMode: "findWorld",
  users: [
    {
      name: "Rui",
      score: 0,
    },
    {
      name: "Théo",
      score: 0,
    },
    {
      name: "Lucas",
      score: 0,
    },
  ],
  adminId: "ferverhkbfjrebe",
  adminName: "Baptiste",
  questions: questions,
  difficulty: "medium",
  nbRounds: 3,
};
