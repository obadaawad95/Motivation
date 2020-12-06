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

  const removevideo = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/videos/${id}`,
        "DELETE",
        null
      );
      dispatch({
        type: "REMOVE_VIDEO",
        payload: id,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const editvideo = async (EditedVideo) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/videos/${EditedVideo.id}`,
        "PATCH",
        JSON.stringify({
          title: EditedVideo.title,
          undertitle: EditedVideo.undertitle,
          description: EditedVideo.description,
          // pic: EditedVideo.pic,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      dispatch({
        type: "EDIT_VIDEO",
        payload: EditedVideo,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const addvideo = async (createdvideo) => {
    try {
      const formData = new FormData();
      formData.append("thecat", createdvideo.thecat);
      formData.append("title", createdvideo.title);
      formData.append("undertitle", createdvideo.undertitle);
      formData.append("description", createdvideo.description);
      formData.append("image", createdvideo.image);
      await sendRequest("http://localhost:5000/admin/videos", "POST", formData);
      dispatch({
        type: "ADD_VIDEO",
        payload: createdvideo,
      });
    } catch (err) {}
  };
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
        removevideo,
        addvideo,
        editvideo,
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
