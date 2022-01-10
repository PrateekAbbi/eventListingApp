import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./Event.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../actions/eventAction";
import ErrorMessage from "../../components/Error";
import Loading from "../../components/Loading";
import { Button } from "react-bootstrap";

const Event = () => {
  let { Id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/events/${Id}`);
      console.log(data);

      setTitle(data.title);
      setBody(data.body);
    };

    fetching();
  }, [Id]);

  const eventDelete = useSelector((state) => state.eventDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteEvent(id));
      navigate("/");
    }
  };

  return (
    <div className="container">
      <br />
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      <h2>{title}</h2>
      <p>{body}</p>
      <br></br>
      <Link to={`/updateEvent/${Id}`} className="btn btn-primary">
        Update This event
      </Link>
      <Button
        className="btn btn-primary"
        variant="danger"
        onClick={() => deleteHandler(Id)}
        style={{ marginLeft: "10px" }}
      >
        Delete this event
      </Button>
    </div>
  );
};

export default Event;
