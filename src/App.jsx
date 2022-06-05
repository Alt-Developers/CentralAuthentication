import Login from "./pages/Login";
import Select from "./pages/Select";
import "./sass/main.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Signup from "./pages/Signup";
import SimpleModal from "./components/simpleModal";
import { useState } from "react";
import Redirect from "./pages/Redirect";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import Developer from "./pages/Developer";

function App() {
  const [userInfo, setUserInfo] = useState();
  const modalState = useSelector((state) => state.modal);
  const [isDeveloper, setIsDeveloper] = useState(false);

  // console.log(modalState);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) localStorage.removeItem("token");
  // }, []);

  const liftUserInfo = (userInfo) => {
    setUserInfo(userInfo);
  };
  const liftIsDeveloper = (isDeveloper) => {
    setIsDeveloper(isDeveloper);
  };

  return (
    <>
      <SimpleModal
        isOpen={modalState.isOpen}
        header={modalState.header}
        text={modalState.text}
        type={modalState.type}
      >
        <Routes>
          <Route
            path="login/:service"
            element={<Login liftIsDeveloper={liftIsDeveloper} />}
          />
          <Route path="signup/:service" element={<Signup />} />
          {isDeveloper && (
            <Route path="developer/:service" element={<Developer />} />
          )}
          <Route
            path="redirect"
            element={<Redirect liftUserInfo={liftUserInfo} />}
          />

          <Route path="dashboard" element={<Dashboard userInfo={userInfo} />} />
          <Route path="*" element={<Select />} />
        </Routes>
      </SimpleModal>
    </>
  );
}

export default App;
