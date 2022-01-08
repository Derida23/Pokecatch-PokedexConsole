import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Main/Header";
import DetailPage from "../pages/Detail";
import DexPage from "../pages/Dex";
import ListPage from "../pages/List";

export const RouterControl = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
        <Route path="/pokedex" element={<DexPage />} />
      </Routes>
    </Router>
  );
};
