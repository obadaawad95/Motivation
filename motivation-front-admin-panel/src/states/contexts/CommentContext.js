import React, { createContext, useReducer } from "react";
import CommentReducer from "../reducers/CommentReducer";
import { useHttpClient } from "../../hooks/http-hook";
const initialState = {
  Comments: [],
};
export const CommentContext = createContext(initialState);
const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CommentReducer, initialState);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const removeComment = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/comments/${id}`,
        "DELETE",
        null
      );
      dispatch({
        type: "REMOVE_COMMENT",
        payload: id,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const getComments = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/admin/comments"
      );
      dispatch({
        type: "GET_COMMENTS",
        payload: responseData.comments,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        Comments: state.Comments,
        removeComment,
        getComments,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
export default CommentContextProvider;
