import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useJoinRoom = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  return useMutation({
    mutationFn: async (payload: {
      roomCode: string;
      username: string;
      playerId: string;
    }) => {
      const { data } = await axios.post(`${API_URL}/room/join`, payload);
      return data;
    },
  });
};
