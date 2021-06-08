import React from "react";
import { movieList } from "./resources";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import "./App.styles.css";

/** STORE SETUP**/
const movieSlice = createSlice({
  name: "movies",
  initialState: movieList,
  reducers: {
    like: (state, action) => state[action.payload].likes++,
    dislike: (state, action) => state[action.payload].likes--,
  },
});

const { like, dislike } = movieSlice.actions;
const store = configureStore({
  reducer: {
    like,
    dislike,
  },
});

const ReduxApp = () => {
  return <div></div>;
};

export default ReduxApp;
