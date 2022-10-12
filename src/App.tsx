import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function App() {
  const allowedServices = ["timetables"];
  const isPhone = useMediaQuery({ maxWidth: "800px" });

  const toasterStyle = {
    minWidth: "20rem",
    fontFamily: "Poppins",
    fontSize: "1.5rem",
    fontWeight: "700",
    boxShadow: "0 0 3rem #00000005",
    padding: "2rem",
    gap: "2rem",
    backgroundColor: "var(--light-2)",
  };

  return (
    <>
      <Routes>
        <Route
          path="login/:service"
          element={<Login allowedServies={allowedServices} />}
        />
        <Route path="/signup/:service?" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="*" element={<Home allowedServies={allowedServices} />} />
      </Routes>
      <Toaster
        toastOptions={{ style: toasterStyle }}
        position={isPhone ? "top-left" : "top-center"}
      />
    </>
  );
}

export default App;
