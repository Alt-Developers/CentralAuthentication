import { useFormik } from "formik";
import logo from "../assets/img/ssLogo.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CirclePicker } from "react-color";
import { useState } from "react";

const Signup = props => {
  const { service: params } = useParams();
  const allowedParams = ["timetables", "system13"];
  const [selectedColor, setSelectedColor] = useState("#FF5252");
  const [image, setImage] = useState(null);

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email Required";
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

  const colorChangeHandler = color => {
    setSelectedColor(color);
    console.log(selectedColor);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: values => {
      console.log(values, `To ${params}`);
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
              window.location.href = `http://localhost:3001/token/:${localStorage.getItem(
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
      <div
        className="login__rectangle"
        style={{ backgroundColor: selectedColor.hex }}
      />

      {allowedParams.includes(params) ? (
        <div className="login__modal signup">
          <div className="login__text">
            <h3>Signup</h3>
            <p>To SS account for {params.replace(":", "")}</p>
          </div>
          <form className="signup__form" onSubmit={formik.handleSubmit}>
            <input
              style={{ gridArea: "firstname" }}
              type="text"
              className="signup__form--input"
              name="firstname"
              placeholder="firstname"
              values={formik.values.firstname}
              onChange={formik.handleChange}
            />
            <input
              style={{ gridArea: "lastname" }}
              className="signup__form--input"
              type="text"
              name="lastname"
              placeholder="lastname"
              values={formik.values.lastname}
              onChange={formik.handleChange}
            />
            <input
              style={{ gridArea: "email" }}
              type="text"
              className="signup__form--input"
              name="email"
              placeholder="email"
              values={formik.values.email}
              onChange={formik.handleChange}
            />
            <input
              style={{ gridArea: "pass" }}
              type="password"
              className="signup__form--input"
              name="password"
              placeholder="password"
              values={formik.values.password}
              onChange={formik.handleChange}
            />
            <div
              className="signup__form--color signup__form--input"
              style={{ borderRadius: "1.1rem 1.1rem 0 0 " }}>
              <CirclePicker
                width="300px"
                onChange={colorChangeHandler}
                colors={[
                  "#FF5252",
                  "#4a92ff",
                  "#5df089",
                  "#ffd454",
                  "#c842f5",
                  "#fa46c7",
                ]}
                circleSize={25}
              />
            </div>
            <button
              className="signup__imgWrapper"
              style={{ gridArea: "image" }}
              type="button">
              {!image && <i className="bx bx-image-add"></i>}
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="userProfile"
                  height="150px"
                  width="150px"
                  className="previewImg"
                />
              )}
              <input
                type="file"
                name="image"
                style={{ borderRadius: "2rem" }}
                accept="image/*"
                onChange={event => {
                  setImage(event.currentTarget.files[0]);
                }}
                className="signup__img"
              />
            </button>
            <a href="https://system.ssdevelopers.xyz/signup">
              Dont have an account?
            </a>
            <button
              className="signup__form--button"
              type="submit"
              style={{ backgroundColor: selectedColor.hex }}>
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

export default Signup;
