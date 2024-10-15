import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomeScreen } from "./pages/home";

const Router: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
