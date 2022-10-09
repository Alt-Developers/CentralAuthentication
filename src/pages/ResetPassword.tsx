import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const isPhone = useMediaQuery({ maxWidth: 800 });
  const [username, setUsername] = useState("");
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  const notify = (text: string) => {
    return toast.error(text);
  };

  useEffect(() => {
    console.log(token);
    if (token === "this-is-invalid") setIsTokenInvalid(true);
    setUsername("Prawich Thawansakdivudhi");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isTokenInvalid) return;
    toast.error("Invalid Token");
    navigate("/");
    return;
  }, [isTokenInvalid]);

  return (
    <section className="background">
      <div className="login__floater">
        <h1>
          Hi, {username} <br />
          It seems like you have{" "}
          <div className="accent">forgotten your password</div>
        </h1>
        <button onClick={() => notify("Password Invalid")}>h</button>
      </div>
      <div className="background__logo">Alternate.</div>
      {!isPhone && (
        <div className="background__copy">
          GNU General Public License v3.0 &copy; 2022 - Alternate.
        </div>
      )}
    </section>
  );
};

export default ResetPassword;
