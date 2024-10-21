import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ICreateRoom {
  username: string;
  gameMode: string;
  userId: string;
}

export const useCreateRoom = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  return useMutation({
    mutationFn: async (payload: ICreateRoom) => {
      const { data } = await axios.post(`${API_URL}/room`, payload);

      return data;
    },
  });
};
