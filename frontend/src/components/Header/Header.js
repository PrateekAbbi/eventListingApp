import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            Your Events
          </Link>
        </div>
        {userInfo ? (
          <ul className="nav navbar-nav navbar-right">
            <li id="addEvent">
              <Link to="/addEvent">Add an Event</Link>
            </li>
            <li id="addEvent">
              <Link to="/logIn" onClick={logOutHandler}>
                <i className="fa fa-sign-out fa-2x"></i>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav navbar-right">
            <li id="addEvent">
              <Link to="/logIn">Log In</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
