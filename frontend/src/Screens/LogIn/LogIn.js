import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loading from "../../components/Loading";
import { Typography } from "@mui/material";
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
          label="Email Address"
          variant="outlined"
          type={"email"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          name="username"
          autoFocus
        />
        <TextField
          required
          id="outline-required"
          label="Password"
          variant="outlined"
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
          Log In
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
          href="/signUp"
          className="cursive lsbtn"
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default LogIn;
