import Notify from "../helper/Notify";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const { service } = useParams();
  const [avatar, setAvatar] = useState<Blob | MediaSource | null>(null);
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;

    if (password !== confirmationPassword) {
      Notify("Confirming Password Doesn't Match");
    } else if (!pattern.test(password)) {
      Notify(
        "Password must have at least 8 letters, 1 Alphabetical Character, 1 Number"
      );
    } else {
      // Send information to back-end
    }
  };

  return (
    <section className="background">
      <form className="login__floater" onSubmit={submitHandler}>
        <div className="login__title">
          <h1>
            Create your <span className="accent">Alt. Account</span>
            <br />
          </h1>
          <p>Let's get you started</p>
        </div>

        <div className="signup__fieldGrid">
          <div>
            <div className="login__fieldContainer">
              <p>Username</p>
              <input type="text" placeholder="JohnnyIsCool" />
            </div>

            <div className="login__fieldContainer">
              <p>
                Name &#8212; <span className="light">Can be spaced</span>
              </p>
              <input
                autoComplete="off"
                type="text"
                placeholder="Johnny Appleseed"
              />
            </div>

            <div className="login__fieldContainer">
              <p>
                Password &#8212;{" "}
                <span className="light">
                  At least 8 letters,
                  <br /> 1 Alphabetical Character, 1 Number
                </span>
              </p>
              <input
                autoComplete="do-not-autofill"
                type="password"
                placeholder="Johnny1234"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="login__fieldContainer">
              <p>Confirm your Password</p>
              <input
                type="password"
                placeholder="Johnny1234"
                value={confirmationPassword}
                onChange={e => setConfirmationPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="login__fieldContainer">
              <p>Email</p>
              <input type="email" placeholder="example@example.com" />
            </div>

            <div className="login__fieldContainer">
              <p>Avatar</p>
              <div className="signup__imgInputWrapper">
                <div className="signup__imgInputCenter">
                  {avatar ? (
                    <img src={URL.createObjectURL(avatar)} alt="" />
                  ) : (
                    <div className="signup__imgInputEmpty">
                      <i className="bx bx-user-circle"></i>
                      <p>Drop a photo or click here to upload a photo</p>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  style={{ height: "100% !important" }}
                  onChange={event => {
                    // @ts-ignore
                    setAvatar(event.currentTarget.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="login__submitContainer"
          style={{ position: "absolute", bottom: "3rem", right: "3rem" }}
        >
          <Link to="/login/timetables">Already have an account?</Link>

          <button type="submit" className="login__submit">
            Login
          </button>
        </div>
      </form>

      <div className="background__logo">Alternate.</div>
      <div className="background__copy">
        GNU General Public License v3.0 &copy; 2022 - Alternate.
      </div>
    </section>
  );
};

export default Signup;
