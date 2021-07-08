import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://letsdovideo.com/wp-content/uploads/2016/11/Amazon_Logo.jpg"
        />
      </Link>
    </div>
  );
};

export default Login;
