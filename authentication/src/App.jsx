import Login from "./pages/Login";
import "./sass/main.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="login">
          <Route path=":service" element={<Login />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <h1>Nothin here</h1>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
