import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
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
        <p>{username}</p>
        <p>{password}</p>
      </div>
      {loading && <Loading />}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className="form-signup"
        onSubmit={submitHandler}
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <br />
        <TextField
          required
          id="outlined-required"
          label="Full Name"
          variant="outlined"
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          autoFocus
        />
        <TextField
          required
          id="outlined-required"
          label="Email Address"
          variant="outlined"
          type={"email"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          variant="outlined"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        />
        <Button
          variant="contained"
          type="submit"
          size="large"
          style={{ width: "85.5%" }}
          className="cursive lsbtn"
        >
          Sign Up
        </Button>
        <Typography
          style={{ margin: "-6.5px", width: "104%", fontSize: "15px" }}
          className="cursive"
        >
          or
        </Typography>
        <Button
          className="logIn"
          variant="contained"
          size="large"
          style={{ width: "85.5%" }}
          href="/logIn"
          className="cursive lsbtn"
        >
          Log In
        </Button>
      </Box>
    </div>
  );
};

export default SignUp;
