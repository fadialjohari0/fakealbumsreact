import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import UserContext from "../../Context/UserContext";
import styles from "./login.module.scss";
import api from "../api/baseUrl";

const Login = () => {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (email.length === 0) {
      setError("Enter an email");
      return;
    }
    setFormSubmit(true);
  };

  const emailChangeHandler = (e) => {
    let userEmailInput = e.target.value;
    setEmail(userEmailInput);
  };

  useEffect(() => {
    if (!formSubmit) {
      window.localStorage.clear();
      return;
    }

    const loginFetch = async () => {
      try {
        const response = await api.get("/users");
        const data = await response.data;

        const verifiedUser = data.find(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );
        if (!verifiedUser) {
          throw new Error("Email not found!");
        } else {
          localStorage.setItem("userData", JSON.stringify(verifiedUser));
          setUserData(verifiedUser);
          navigate("/albums");
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          setError(`${err.message}`);
          console.error(err);
        }
        setFormSubmit(false);
      }
    };
    loginFetch();
  }, [formSubmit]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.loginMainDiv}>
        <header className={styles.pageTitle}>Log in</header>
        <div className={styles.loginFormContainer}>
          <form className={styles.loginForm} onSubmit={formSubmitHandler}>
            <input
              type="email"
              placeholder="Email"
              className={styles.emailInput}
              onChange={(e) => emailChangeHandler(e)}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.passwordInput}
            />
            <button className={styles.submitBtn}>LOG IN</button>
            {error && <p className={styles.errorMsg}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
