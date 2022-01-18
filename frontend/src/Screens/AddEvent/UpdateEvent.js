import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEvent, updateEvent } from "../../actions/eventAction";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Error";

const UpdateEvent = () => {
  let { Id } = useParams();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [date, setDate] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { loading, error } = eventUpdate;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/events/${Id}`);

      setTitle(data.title);
      setBody(data.body);
      setDate(data.updatedAt);
    };

    fetching();
  }, [Id, date]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  useEffect(() => {
    dispatch(updateEvent(), deleteEvent());
    if (userInfo === null) {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const resetHandler = () => {
    setTitle("");
    setBody("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateEvent(Id, title, body));

    if (!title || !body) {
      return;
    }

    resetHandler();
    navigate("/");
  };

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
      <Card>
        <Card.Header>Edit your event</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
            </Form.Group>
            {loading && <Loading size={50} />}
            {loadingDelete && <Loading />}
            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the body"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <br />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update this Event
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              style={{ marginLeft: "10px" }}
              onClick={() => deleteHandler(Id)}
            >
              Delete this event
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default UpdateEvent;
