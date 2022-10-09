import axios from "axios";

import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const { service } = useParams();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  useEffect(() => {
    document.title = `404 Not found | Alternate.`;
  }, []);

  return (
    <section className="background">
      <div className="login__floater">
        <h1>
          Alt<span className="accent">.</span> Authentication
        </h1>
        <p>
          Welcome to Central Authentication Portals for Alternate. <br />
          Please Select from one of the service down below to continue{" "}
        </p>
      </div>
      <div className="background__logo">Alternate.</div>
    </section>
  );
};

export default Home;
