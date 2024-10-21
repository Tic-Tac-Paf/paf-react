import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomeScreen } from "./pages/home";
import { JoinScreen } from "./pages/join";
import { CreateScreen } from "./pages/create";
import { DefaultLayout } from "./core/layout/default-layout";
import { WaitingRoomScreen } from "./pages/waiting-room";
import { RoomScreen } from "./pages/room";

const Router: React.FC = () => {
  return (
    <DefaultLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/join" element={<JoinScreen />} />
          <Route path="/waiting-room/:id" element={<WaitingRoomScreen />} />
          <Route path="/room/:id" element={<RoomScreen />} />
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
};

export default Router;
