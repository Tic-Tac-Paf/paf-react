import { useQuery } from "@tanstack/react-query";
import { roomExample } from "../../assets/mocks/room";

export const useGetRoom = () => {
  return useQuery({
    queryKey: ["/get-room"],
    queryFn: async () => {
      // Simule la réponse avec les joueurs mockés
      return roomExample;
    },
  });
};
