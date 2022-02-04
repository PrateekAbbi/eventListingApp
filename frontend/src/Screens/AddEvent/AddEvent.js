import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../actions/eventAction";
import Loading from "../../components/Loading";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [eventBody, setEventBody] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventCreate = useSelector((state) => state.eventCreate);
  const { loading, event } = eventCreate;
  console.log(event);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  useEffect(() => {
    dispatch(createEvent());
    if (userInfo === null) {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const resetHandler = () => {
    setTitle("");
    setEventBody("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !eventBody) {
      return;
    }
    dispatch(createEvent(title, eventBody));

    resetHandler();

    navigate("/");
  };

  return (
    <div className="container">
      <Card>
        <Card.Header>Add an event</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label className="cursive">
                <b>Title</b>
              </Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                className="cursive"
                style={{ fontSize: "15px" }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label className="cursive">
                <b>Body</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                value={eventBody}
                placeholder="Enter the Body of your event"
                rows={4}
                className="cursive"
                style={{ fontSize: "15px" }}
                onChange={(e) => setEventBody(e.target.value)}
              />
              <br />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="cursive"
            >
              Add Event
            </Button>
            <Button
              className="mx-2"
              onClick={resetHandler}
              variant="contained"
              color="error"
              className="cursive"
              style={{ marginLeft: "10px" }}
            >
              Reset Fields
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AddEvent;
