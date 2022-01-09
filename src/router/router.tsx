import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "../components/Main/Header";
import DetailPage from "../pages/Detail";
import DexPage from "../pages/Dex";
import ErrorPage from "../pages/Empty/Conn";
import EmptyPage from "../pages/Empty/Empty";
import ListPage from "../pages/List";

export const RouterControl = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
        <Route path="/pokedex" element={<DexPage />} />
        <Route path="/404" element={<EmptyPage />} />
        <Route path="/error-connection" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};
