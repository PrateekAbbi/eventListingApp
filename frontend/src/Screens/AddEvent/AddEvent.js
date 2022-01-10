import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../actions/eventAction";
import Loading from "../../components/Loading";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [eventBody, setEventBody] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const eventCreate = useSelector((state) => state.eventCreate);
  const { loading, error, event } = eventCreate;
  console.log(event);

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
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                value={eventBody}
                placeholder="Enter the Body of your event"
                rows={4}
                onChange={(e) => setEventBody(e.target.value)}
              />
              <br />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Add Event
            </Button>
            <Button
              className="mx-2"
              onClick={resetHandler}
              variant="danger"
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
