import { useFormik } from "formik";
import logo from "../assets/img/ssLogo.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CirclePicker } from "react-color";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { modalActions } from "../context/modalSlice";

const Signup = (props) => {
  const { service: params } = useParams();
  const allowedParams = ["timetables", "system13"];
  const [selectedColor, setSelectedColor] = useState({ hex: "#707070" });
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const colorChangeHandler = (color) => {
    setSelectedColor(color);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password Required";
    }

    if (!values.firstname) {
      errors.firstname = "Firstname is required";
    } else if (values.firstname.length < 3 && values.firstname.length > 30) {
      errors.firstname = "Invalid firstname length";
    }

    if (!values.lastname) {
      errors.lastname = "Lastname is required";
    } else if (values.lastname.length < 3 && values.lastname.length > 30) {
      errors.lastname = "Invalid lastname length";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: (values) => {
      let formData = new FormData();

      formData.append("email", values.email);
      formData.append("pass", values.password);
      formData.append("firstName", values.firstname);
      formData.append("lastName", values.lastname);
      formData.append("primaryColor", selectedColor.hex);

      if (image) formData.append("image", image);

      fetch("https://apis.ssdevelopers.xyz/auth/signup", {
        method: "POST",
        body: formData,
      }).then(async (data) => {
        const res = await data.json();
        // console.log(res);
        if (!data.status.startsWith(2)) {
          // console.log("error");
          console.error();
        } else if (res.modal) {
          // console.log("asd");
          dispatch(
            modalActions.openModal({ header: res.header, text: res.message })
          );
        } else {
          // console.log("redirecting");
          window.location.href = `https://authentication.ssdevelopers.xyz/login/${params}`;
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
        <motion.div
          className="login__modal signup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
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
              style={{ borderRadius: "1.1rem 1.1rem 0 0 " }}
            >
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
              type="button"
            >
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
                onChange={(event) => {
                  setImage(event.currentTarget.files[0]);
                }}
                className="signup__img"
              />
            </button>
            <Link to={`/login/${params}`}>Already have an account?</Link>
            <button
              className={`signup__form--button ${
                selectedColor.hex === "#707070" ? "disableHover" : ""
              }`}
              type="submit"
              style={{ backgroundColor: selectedColor.hex }}
              disabled={selectedColor.hex === "#707070"}
            >
              <i className="bx bxs-chevrons-right"></i>
            </button>
          </form>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="login__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
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
          </motion.div>
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
