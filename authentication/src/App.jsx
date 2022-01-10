import Login from "./pages/Login";
import Select from "./pages/Select";
import "./sass/main.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Signup from "./pages/Signup";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
  }, []);

  return (
    <>
      <Routes>
        <Route path="login/:service" element={<Login />} />
        <Route path="signup/:service" element={<Signup />} />
        <Route path="*" element={<Select />} />
      </Routes>
    </>
  );
}

export default App;
