import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Error";
import { registerUser } from "../../actions/userAction";

import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();

    dispatch(registerUser(name, username, password));
  };

  return (
    <div className="text-center">
      <div className="greeting">
        <h1>Hello {name}, we are happy to see you😊</h1>
        <br />
        <p>{username}</p>
        <p>{password}</p>
      </div>
      {loading && <Loading />}
      <form className="form-signup" onSubmit={submitHandler}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <input
          type={"text"}
          id="fullName"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          placeholder="Your full name"
          required
          autoFocus
        />
        <input
          type={"email"}
          id="inputEmail"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          name="username"
          placeholder="Your Email Address"
          required
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
          Sign Up
        </button>
        <div className="signup">
          <Link to="/logIn" className="btn btn-lg btn-primary btn-block">
            Already have an account - Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
