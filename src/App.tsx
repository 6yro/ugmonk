import React from "react";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { NotFound } from "./pages/NotFound";
import { FullProduct } from "./pages/FullProduct";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/product/:id" element={<FullProduct />} />
      </Routes>
    </>
  );
}

export default App;
