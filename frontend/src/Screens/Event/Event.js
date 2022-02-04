import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import "./Event.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, listEvent, updateEvent } from "../../actions/eventAction";
import ErrorMessage from "../../components/Error";
import Loading from "../../components/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px #000",
  boxShadow: 24,
  p: 4,
};

const Event = () => {
  let { Id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { loading, error } = eventUpdate;

  const eventDelete = useSelector((state) => state.eventDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/events/${Id}`);
      console.log(data);

      setTitle(data.title);
      setBody(data.body);
    };

    fetching();
  }, [Id]);

  useEffect(() => {
    dispatch(listEvent());
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
      <Card sx={{ minWidth: 275 }} variant="outlined">
        <CardContent>
          <Typography variant="h5" className="cursive">
            {title}
          </Typography>
          <br />
          <Typography variant="body2" className="cursive">
            {body}
          </Typography>
          <br />
          <Button
            variant="contained"
            color="primary"
            //href={`/updateEvent/${Id}`}
            size="large"
            style={{ width: "8%" }}
            onClick={handleOpen}
          >
            <EditIcon size="large" />
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            style={{ marginLeft: "15px", width: "8%" }}
            onClick={() => deleteHandler(Id)}
          >
            <DeleteIcon size="large" />
          </Button>
        </CardContent>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <>
              <>
                <Typography variant="h5" component="div" className="cursive">
                  Edit your event
                </Typography>
                <br />
                <Form onSubmit={updateHandler}>
                  <Form.Group controlId="title">
                    <Form.Label>
                      <b>Title</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the title"
                      value={title}
                      className="cursive"
                      style={{ fontSize: "15px", width: "95%" }}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                  </Form.Group>
                  {loading && <Loading size={50} />}
                  {loadingDelete && <Loading />}
                  <Form.Group controlId="body">
                    <Form.Label>
                      <b>Body</b>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter the body"
                      rows={4}
                      value={body}
                      className="cursive"
                      style={{ fontSize: "15px", maxWidth: "95%" }}
                      onChange={(e) => setBody(e.target.value)}
                    />
                    <br />
                  </Form.Group>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ width: "30%" }}
                  >
                    <CheckIcon />
                  </Button>
                  <Button
                    className="mx-2"
                    variant="contained"
                    color="error"
                    style={{ marginLeft: "15px", width: "30%" }}
                    onClick={handleClose}
                  >
                    <ClearIcon />
                  </Button>
                </Form>
                <br />

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Updating on - {new Date().toLocaleDateString()}
                </Typography>
              </>
            </>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Event;
