import React, { createContext, useReducer } from "react";
import PostReducer from "../reducers/PostReducer";
import { useHttpClient } from "../../hooks/http-hook";
const initialState = {
  Posts: [],
};
export const PostContext = createContext(initialState);
const PostContextProvider = (props) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const removePost = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/posts/${id}`,
        "DELETE",
        null
      );
      dispatch({
        type: "REMOVE_POST",
        payload: id,
      });
    } catch (err) {}
  };

  const getPosts = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/admin/posts"
      );
      dispatch({
        type: "GET_POSTS",
        payload: responseData.posts,
      });
    } catch (err) {}
  };

  return (
    <PostContext.Provider
      value={{
        Posts: state.Posts,
        removePost,
        getPosts,
        isLoading,
        error,
        clearError,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
