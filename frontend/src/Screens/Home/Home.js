import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
        <h1>Hello {userInfo.name}, welcome back</h1>
        <br></br>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {events?.map((event) => (
          <div key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.body.substring(0, 100) + " ..."}</p>
            <Link to={`/event/${event._id}`}>Read More</Link>
            <br />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Please log in to view your details.</h1>
        <h3>
          <Link to="/logIn">Click here</Link> to log in
        </h3>
      </div>
    );
  }
};

export default Home;
