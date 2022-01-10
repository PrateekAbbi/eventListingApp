import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Error";

import "./LogIn.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div className="text-center">
      <div className="greeting">
        <h1>Hello, Please Enter your credentials</h1>
        <br />
        <p>{username}</p>
        <p>{password}</p>
      </div>
      {loading && <Loading />}
      <form className="form-signup" onSubmit={submitHandler}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <input
          type={"email"}
          id="fullName"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          name="username"
          placeholder="Your email address"
          required
          autoFocus
        />
        <input
          type={"password"}
          id="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          placeholder="Your password"
          required
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Log In
        </button>
        <div className="logIn">
          <Link to="/signUp" className="btn btn-lg btn-primary btn-block">
            Don't have an account - Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
