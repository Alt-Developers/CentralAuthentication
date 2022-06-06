import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/img/ssLogo.png";
import { Link } from "react-router-dom";

const Developer = (props) => {
  const { service } = useParams();
  const [portNumber, setPortNumber] = useState();

  useEffect(() => {
    document.title = "Developer | SS Authentication";
  }, []);

  const redirectTo = (event, to) => {
    event.preventDefault();
    console.log(to);

    window.location.href = `${to}/token?to=home&token=${localStorage.getItem(
      "token"
    )}`;
  };

  return (
    <>
      <section className="login">
        <img src={logo} alt="logo" className="login__logo" />
        <div className="login__rectangle" />

        <div className="port__modal">
          <div className="port__left">
            <div className="login__text">
              <h3>Localhost</h3>
              <p>Redirect to localhost</p>
            </div>
            <form className="login__form">
              <input
                type="number"
                name="port"
                value={portNumber}
                placeholder="3000"
                onChange={(e) => {
                  setPortNumber(e.target.value);
                }}
              />

              <button
                className="port__leftButton"
                onClick={(event) =>
                  redirectTo(event, `http://localhost:${portNumber || 3000}`)
                }
              >
                <i className="bx bxs-chevrons-right"></i>
              </button>
            </form>
          </div>

          <div className="port__right">
            <div className="login__text">
              <h3>Production </h3>
              <p>Redirect to the production site</p>
            </div>
            <form className="login__form">
              <button
                className="port__rightButton"
                onClick={(event) =>
                  redirectTo(event, `https://timetables.ssdevelopers.xyz`)
                }
              >
                <i className="bx bxs-chevrons-right"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Developer;
