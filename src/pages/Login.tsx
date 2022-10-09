import axios, { AxiosError } from "axios";
import Notify from "../helper/Notify";

import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Login: React.FC<{ allowedServies: string[] }> = (props) => {
  const { service } = useParams();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const isPhone = useMediaQuery({ maxWidth: 800 });

  const uppercasedServiceName =
    service?.charAt(0).toUpperCase()!! + service?.slice(1);

  useEffect(() => {
    props.allowedServies.includes(service ?? "")
      ? (document.title = `Login to ${uppercasedServiceName} | Alternate.`)
      : (document.title = `404 Not found | Alternate.`);
  });

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const fetching = new Promise((reslove, reject) => {
      axios
        .post("https://apis.altdevelopers.dev/auth/login", {
          email: enteredEmail,
          pass: enteredPassword,
        })
        .then((res: AxiosResponse) => {
          console.log(res.status);
          if (res.data.isNewUser) {
            window.location.href = `https://timetables.altdevelopers.dev/token?to=setup&token=${res.data.token}`;
          } else {
            window.location.href = `https://timetables.altdevelopers.dev/token?to=home&token=${res.data.token}`;
          }
          reslove("Success");
        })
        .catch((err: AxiosError) => {
          // @ts-ignore
          if (err.response.data.modal) {
            // @ts-ignore
            reject(err.response.data.header);
          }
        });
    });
    toast.promise(fetching, {
      success: "Success!",
      loading: "Verifying User",
      error: (err) => err.toString(),
    });
  };

  if (props.allowedServies.includes(service ?? "")) {
    return (
      <section className="background">
        <form className="login__floater" onSubmit={submitHandler}>
          <div className="login__title">
            <h1>
              Login in to {uppercasedServiceName} with <br />
              <span className="accent">Alt. Account</span>
            </h1>
            <p>An alternate experience awaits</p>
          </div>

          <div className="login__fieldContainer">
            <p>Email</p>
            <input
              type="email"
              placeholder="example@example.com"
              onChange={(e) => setEnteredEmail(e.target.value)}
              value={enteredEmail}
            />
          </div>

          <div className="login__fieldContainer">
            <p>Password</p>
            <input
              type="password"
              placeholder="example123"
              onChange={(e) => setEnteredPassword(e.target.value)}
              value={enteredPassword}
            />
          </div>

          <div className="login__submitContainer">
            <Link to="/signup">Don't have an account?</Link>
            <Link to="/forgotpassword">Forgot your password?</Link>
            <button type="submit" className="login__submit">
              Login
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
  } else {
    return (
      <section className="background">
        <div className="login__floater">
          <h1>
            Are you sure <span className="accent">{uppercasedServiceName}</span>{" "}
            <br />
            was the service you were looking for?
          </h1>
          <p>
            The service "{uppercasedServiceName}" doesn't exist in our database
          </p>
        </div>
        {!isPhone && (
          <div className="background__copy">
            GNU General Public License v3.0 &copy; 2022 - Alternate.
          </div>
        )}
      </section>
    );
  }
};

export default Login;
