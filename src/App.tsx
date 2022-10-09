import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const allowedServices = ["timetables"];

  return (
    <>
      <Routes>
        <Route
          path="login/:service"
          element={<Login allowedServies={allowedServices} />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<Home allowedServies={allowedServices} />} />
      </Routes>
    </>
  );
}

export default App;
