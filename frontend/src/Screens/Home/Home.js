import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { listEvent } from "../../actions/eventAction";
import Loading from "../../components/Loading";

import "./Home.css";
import ErrorMessage from "../../components/Error";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventList = useSelector((state) => state.eventList);
  const { loading, events, error } = eventList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  const eventCreate = useSelector((state) => state.eventCreate);
  const { success: successCreate } = eventCreate;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { success: successUpdate } = eventUpdate;

  const eventDelete = useSelector((state) => state.eventDelete);
  const { success: successDelete } = eventDelete;

  useEffect(() => {
    dispatch(listEvent());
    if (userInfo === null) {
      navigate("/logIn");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  if (userInfo !== null) {
    return (
      <div className="container">
        <br></br>
        <Typography variant="h3" component="div" className="cursive">
          Hello {userInfo.name}, welcome back
        </Typography>
        <br></br>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {events?.map((event) => (
          <Card sx={{ minWidth: 275, marginBottom: "15px" }} variant="outlined">
            <CardContent>
              <div key={event._id}>
                <Typography variant="h5" className="cursive">
                  {event.title}
                </Typography>
                <br />
                <Typography variant="body2" className="cursive">
                  {event.body.substring(0, 100) + " ..."}
                </Typography>
                <Link
                  to={`/event/${event._id}`}
                  style={{ color: "#1abc9c", textDecoration: "none" }}
                >
                  Read More
                </Link>
                <br />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  } else {
    return (
      <div className="container">
        <Card sx={{ minWidth: 275 }} variant="outlined">
          <CardContent>
            <Typography variant="h5" className="cursive">
              Please log in to view your details.
            </Typography>
            <Typography variant="h6" className="cursive">
              <Link to="/logIn">Click here</Link> to log in
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default Home;
