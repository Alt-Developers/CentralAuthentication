import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const ForgotPassword = () => {
  const isPhone = useMediaQuery({ maxWidth: 800 });

  useEffect(() => {
    document.title = `Reset Password | Alternate.`;
  }, []);

  return (
    <section className="background">
      <form className="login__floater">
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
          <input type="text" placeholder="example@example.com" />
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
