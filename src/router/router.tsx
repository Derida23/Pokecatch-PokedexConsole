import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "../components/Main/Footer";
import Header from "../components/Main/Header";
import DetailPage from "../pages/Detail";
import ListPage from "../pages/List";

export const RouterControl = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};
