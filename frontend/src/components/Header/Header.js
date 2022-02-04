import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logOutHandler = () => {
    dispatch(logOut());
    navigate("/logIn");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#f8f8f8" }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="navbar-brand cursive">
              Your Events
            </Link>
          </Typography>
          {userInfo ? (
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb" style={{ fontSize: "20px" }}>
                <Link
                  to="/addEvent"
                  underline="hover"
                  className="navbar-nav cursive"
                >
                  Add an Event
                </Link>
                <Link
                  to="/logIn"
                  underline="hover"
                  className="navbar-nav cursive"
                  onClick={logOutHandler}
                >
                  <LogoutIcon className="navbar-nav cursive" />
                </Link>
              </Breadcrumbs>
            </div>
          ) : (
            <ul>
              <li id="addEvent">
                <Link to="/logIn">
                  <LoginIcon fontSize="large" className="navbar-nav cursive" />
                </Link>
              </li>
            </ul>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
