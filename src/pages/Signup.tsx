import axios, { AxiosError, AxiosResponse } from "axios";
import Notify from "../helper/Notify";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { service } = useParams();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<Blob | string>("");
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
      const signupFormData = new FormData();
      signupFormData.append("name", name);
      signupFormData.append("username", username);
      signupFormData.append("email", email);
      signupFormData.append("password", password);
      signupFormData.append("cpassword", confirmationPassword);
      signupFormData.append("image", avatar);

      const fetching = new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "https://apis.altdevelopers.dev/auth/signup",
          data: signupFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res: AxiosResponse) => {
            console.log(res);
            if (res.status === 200) {
              window.location.href = `https://authentication.altdevelopers.dev/login/${service}`;
            }
            resolve("Success");
          })
          .catch((err: Error | AxiosError) =>
            // @ts-ignore
            reject(err.response.data.message)
          );
      });
      toast.promise(fetching, {
        success: "Success!",
        loading: "Verifying User",
        error: err => err.toString(),
      });
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
              <input
                type="text"
                placeholder="JohnnyIsCool"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="login__fieldContainer">
              <p>
                Name &#8212; <span className="light">Can be spaced</span>
              </p>
              <input
                autoComplete="off"
                type="text"
                placeholder="Johnny Appleseed"
                value={name}
                onChange={e => setName(e.target.value)}
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
              <input
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="login__fieldContainer">
              <p>Avatar</p>
              <div className="signup__imgInputWrapper">
                <div className="signup__imgInputCenter">
                  {avatar ? (
                    // @ts-ignore
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
            Signup
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
