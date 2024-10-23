import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomeScreen } from "./pages/home";
import { JoinScreen } from "./pages/join";
import { CreateScreen } from "./pages/create";
import { DefaultLayout } from "./core/layout/default-layout";
import { WaitingRoomScreen } from "./pages/waiting-room";
import { RoomScreen } from "./pages/room";
import { TestScreen } from "./pages/test";

const Router: React.FC = () => {
  return (
    <DefaultLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/join" element={<JoinScreen />} />
          <Route path="/waiting-room" element={<WaitingRoomScreen />} />
          <Route path="/room" element={<RoomScreen />} />
          <Route path="/test" element={<TestScreen />} />
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
};

export default Router;
