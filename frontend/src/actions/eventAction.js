import axios from "axios";
import {
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQ,
  EVENT_CREATE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQ,
  EVENT_DELETE_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_REQ,
  EVENT_LIST_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_REQ,
  EVENT_UPDATE_SUCCESS,
} from "../constants/eventConstants";

export const listEvent = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_LIST_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/events", config);

    dispatch({
      type: EVENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EVENT_LIST_FAIL,
      payload: message,
    });
  }
};

export const createEvent = (title, body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_CREATE_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/events/create",
      { title, body },
      config
    );

    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateEvent = (id, title, body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_UPDATE_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/events/${id}`, { title, body }, config);

    dispatch({
      type: EVENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_DELETE_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/events/${id}`, config);

    dispatch({
      type: EVENT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload: message,
    });
  }
};
