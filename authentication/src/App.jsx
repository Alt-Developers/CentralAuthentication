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

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState("");
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
  }, []);

  const liftCloseModal = () => {
    setModalIsOpen(false);
  };

  const liftAuthError = (header, text, type = "NONE") => {
    console.log(header, text);
    setModalText(text);
    setModalHeader(header);
    setModalType(type);
    setModalIsOpen(true);
  };

  const liftUserInfo = userInfo => {
    setUserInfo(userInfo);
  };

  return (
    <>
      <SimpleModal
        isOpen={modalIsOpen}
        text={modalText}
        liftCloseModal={liftCloseModal}
        header={modalHeader}
        type={modalType}>
        <Routes>
          <Route
            path="login/:service"
            element={<Login liftAuthError={liftAuthError} />}
          />
          <Route
            path="signup/:service"
            element={<Signup liftAuthError={liftAuthError} />}
          />
          <Route
            path="dashRedirect"
            element={<Redirect liftUserInfo={liftUserInfo} />}
          />
          <Route
            path="dashboard"
            element={
              <Dashboard userInfo={userInfo} liftAuthError={liftAuthError} />
            }
          />
          <Route path="*" element={<Select />} />
        </Routes>
      </SimpleModal>
    </>
  );
}

export default App;
