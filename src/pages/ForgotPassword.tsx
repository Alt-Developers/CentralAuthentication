import axios from "axios";

import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { token } = useParams();

  const isPhone = useMediaQuery({ maxWidth: 800 });

  useEffect(() => {
    document.title = `Forgot Password | Alternate.`;
  }, []);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const ForgotPasswordPromise = new Promise((resolve, reject) => {
      axios
        .get(
          `https://apis.altdevelopers.dev/auth/forget-password?email=${email}`
        )
        .then((res: AxiosResponse) => {
          console.log(res);
          resolve(`Sent an email to ${email}`);
        })
        .catch((err: AxiosError | Error) => {
          console.log(err);
          // @ts-ignore
          reject(err.response.data.message);
        });
    });

    toast.promise(ForgotPasswordPromise, {
      success: `Sent an email to ${email}`,
      loading: "Verifying Email",
      error: err => err.toString(),
    });
  };

  return (
    <section className="background">
      <form className="login__floater" onSubmit={submitHandler}>
        <div className="login__title">
          <h1>
            Forgot your <span className="accent">password?</span>{" "}
          </h1>
          <p>
            Don't worry just enter the email you used for <br /> registering an
            Alt. Account and we'll send a password reset email
          </p>
        </div>

        <div className="login__fieldContainer">
          <p>Email Registered to Alt.</p>
          <input
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="login__submitContainer">
          <button
            style={{ width: "15rem" }}
            type="submit"
            className="login__submit"
          >
            Submit
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

export default ForgotPassword;
