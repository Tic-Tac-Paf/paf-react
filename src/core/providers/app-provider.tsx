import React, { createContext, useContext, PropsWithChildren } from "react";

interface AppProviderProps {
  roomCode: string;
  adminId: string;
}

const AppContext = createContext<AppProviderProps>({
  roomCode: "",
  adminId: "",
});

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const adminId = localStorage.getItem("playerId") || "";
  const roomCode = localStorage.getItem("roomCode") || "";

  return (
    <AppContext.Provider
      value={{
        roomCode,
        adminId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
