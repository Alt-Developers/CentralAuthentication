import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useSearchParams } from "react-router-dom";

const Redirect = props => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", searchParams.get("token").replace(":", ""));
    if (searchParams.get("service") === "timetables") {
      navigate("/dashboard/?service=timetables&");
    } else {
      navigate("/select");
    }
  }, []);

  return <Loading />;
};

export default Redirect;
