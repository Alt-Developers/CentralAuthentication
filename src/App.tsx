import Login from "./pages/Login";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="login/:service" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
