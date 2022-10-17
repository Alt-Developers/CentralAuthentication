import { toast } from "react-hot-toast";
import axios from "axios";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [isTokenInvalid, setIsTokenInvalid] = useState<string>("");
  const [newPassword, setNewPasssword] = useState("");
  const [confirmNewPassword, setConfirmNewPasssword] = useState("");

  const isPhone = useMediaQuery({ maxWidth: 800 });
  const navigate = useNavigate();

  const { token } = useParams();

  useEffect(() => {
    console.log(token);
    axios
      .get(`https://apis.altdevelopers.dev/auth/forget-password?token=${token}`)
      .then((res: AxiosResponse) => {
        console.log(res);
        setUsername(res.data.base.name);
      })
      .catch((err: any) => {
        console.log(err);
        setIsTokenInvalid(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (isTokenInvalid === "") return;
    toast.error(isTokenInvalid);
    navigate("/");
    return;
  }, [isTokenInvalid]);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(newPassword, confirmNewPassword);
    const passwordResetPromise = new Promise((reject, resolve) => {
      axios
        .post("https://apis.altdevelopers.dev/auth/change-pw-with-token", {
          token: token,
          password: newPassword,
          cpassword: confirmNewPassword,
        })
        .then((res: AxiosResponse) => {
          console.log(res);

          window.location.href = `https://authentication.altdevelopers.dev/`;
          resolve("");
        })
        .catch((err: any) => {
          console.log(err);
          reject(err.response.data.message);
        });
    });

    toast.promise(passwordResetPromise, {
      loading: "Processing",
      success: "Succesfully changed your password",
      error: e => e.toString(),
    });
  };

  return (
    <section className="background">
      <form className="login__floater" onSubmit={submitHandler}>
        <div className="login__title">
          <h1>
            Hi, {username} <br />
            It seems like you have{" "}
            <div className="accent">forgotten your password</div>
          </h1>
        </div>

        <div className="login__fieldContainer">
          <p>
            New password &#8212;{" "}
            <span className="light">
              At least 8 letters,
              <br /> 1 Alphabetical Character, 1 Number
            </span>
          </p>
          <input
            type="password"
            placeholder="Johnny1234"
            value={newPassword}
            onChange={e => setNewPasssword(e.target.value)}
          />
        </div>

        <div className="login__fieldContainer">
          <p>Confirm new password</p>
          <input
            type="password"
            placeholder="Johnny1234"
            value={confirmNewPassword}
            onChange={e => setConfirmNewPasssword(e.target.value)}
          />
        </div>

        <div className="login__submitContainer">
          <button type="submit" className="login__submit">
            Reset
          </button>
        </div>
      </form>
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
