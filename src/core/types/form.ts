import { InputHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, "size" | "color"> {
  options: SelectOption[];
}

export const difficulties: SelectOption[] = [
  { label: "Facile", value: "easy" },
  { label: "Moyen", value: "medium" },
  { label: "Difficile", value: "hard" },
];

export const gameModes: SelectOption[] = [
  {
    label: "Choisir un mode",
    value: "",
  },
  {
    label: "Trouver le bon mot",
    value: "findWord",
  },
  {
    label: "Ecrire des mots",
    value: "writeWord",
  },
];
