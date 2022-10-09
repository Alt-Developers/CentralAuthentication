import Login from "./pages/Login";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="login/:service" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
