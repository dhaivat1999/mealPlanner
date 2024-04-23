// Routes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import CalCalculator from "./components/CalCalculator";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/calculate" element={<CalCalculator />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
