import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Home: React.FC<{ allowedServies: string[] }> = props => {
  const isPhone = useMediaQuery({ maxWidth: 800 });

  useEffect(() => {
    document.title = `Authentication Home | Alternate.`;
  }, []);

  return (
    <section className="background">
      <div className="login__floater">
        <div className="login__title">
          <h1>
            Alt<span className="accent">.</span> Authentication
          </h1>
          <p>
            Welcome to Central Authentication System for Alternate. <br />
            Please Select from one of the service down below to continue{" "}
          </p>
        </div>

        <div className="login__optionContainer">
          {props.allowedServies.map(service => (
            <Link to={`/login/${service}`} className="login__option">
              {service.charAt(0).toUpperCase()!! + service?.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      <div className="background__logo">Alternate.</div>
      {!isPhone && (
        <div className="background__copy">
          GNU General Public License v2.0 &copy; 2022 - Alternate.
        </div>
      )}
    </section>
  );
};

export default Home;
