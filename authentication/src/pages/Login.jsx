import { useFormik } from "formik";
import logo from "../assets/img/ssLogo.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = props => {
  const { service: params } = useParams();
  const allowedParams = ["timetables", "system13"];

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: values => {
      const enteredEmail = values.email;
      const enteredPass = values.password;

      fetch("https://apis.ssdevelopers.xyz/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          pass: enteredPass,
        }),
      })
        .then(data => {
          if (data.status === 200) return data.json();
          if (data.status === 422) console.log("422"); // Invalid Email;
          if (data.status === 401) console.log("401"); // Not Authorized
          if (data.status === 403) console.log("403"); // Forbidden
        })
        .then(data => {
          localStorage.setItem("token", data.token);
          switch (params) {
            case "timetables":
              window.location.href = `https://timetables.ssdevelopers.xyz/token/:${localStorage.getItem(
                "token"
              )}`;
              break;
            case "system13":
              console.log("SYSTEM13");
              break;
            default:
              console.log("Something went wrong.");
          }
        });
    },
  });

  return (
    <section className="login">
      <img src={logo} alt="logo" className="login__logo" />
      <div className="login__rectangle" />

      {allowedParams.includes(params) ? (
        <div className="login__modal">
          <div className="login__text">
            <h3>LOGIN</h3>
            <p>To SS account for {params.replace(":", "")}</p>
          </div>
          <form className="login__form" onSubmit={formik.handleSubmit}>
            {formik.errors.email && (
              <label htmlFor="email">{formik.errors.email}</label>
            )}
            <input
              type="text"
              name="email"
              placeholder="email"
              values={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <label htmlFor="password">{formik.errors.password}</label>
            )}
            <input
              type="password"
              name="password"
              placeholder="password"
              values={formik.values.password}
              onChange={formik.handleChange}
            />
            <Link to={`/signup/${params}`}>Dont have an account?</Link>
            <button type="submit">
              <i className="bx bxs-chevrons-right"></i>
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="login__modal">
            <div className="login__text">
              <h3>Right Service?</h3>
              <p>
                This is the SS Central Authentication system. You can only login
                to the following.
              </p>
            </div>
            <Link to="/login/timetables" className="btn">
              To Timetables login page<i className="bx bxs-chevrons-right"></i>
            </Link>
          </div>
          <div className="login__footer">
            <p>
              All rights reserved &copy; 2022 <br />
              Central Authentication System
            </p>
          </div>
        </>
      )}

      <div className="login__footer">
        <p>
          All rights reserved &copy; 2022 <br />
          Central Authentication System
        </p>
      </div>
    </section>
  );
};

export default Login;
