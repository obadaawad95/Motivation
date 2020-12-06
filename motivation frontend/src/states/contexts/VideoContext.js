import React, { createContext, useReducer } from "react";
import VideoReducer from "../reducers/VideoReducer";
import { useHttpClient } from "../../hooks/http-hook";

const initialState = {
  Videos: [],
};
export const VideoContext = createContext(initialState);
const VideoContextProvider = (props) => {
  const [state, dispatch] = useReducer(VideoReducer, initialState);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const getvideos = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/admin/videos"
      );
      dispatch({
        type: "GET_VIDEOS",
        payload: responseData.video,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        Videos: state.Videos,
        getvideos,
        isLoading,
        error,
        clearError,
      }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
