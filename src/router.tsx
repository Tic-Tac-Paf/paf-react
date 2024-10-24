import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomeScreen } from "./pages/home";
import { JoinScreen } from "./pages/join";
import { CreateScreen } from "./pages/create";
import { DefaultLayout } from "./core/layout/default-layout";
import { WaitingRoomScreen } from "./pages/waiting-room";
import { GameScreen } from "./pages/game";
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
          <Route path="/game" element={<GameScreen />} />
          <Route path="/test" element={<TestScreen />} />
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
};

export default Router;
