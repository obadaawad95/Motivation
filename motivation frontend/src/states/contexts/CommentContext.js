import React, { createContext, useReducer, useContext, useState } from "react";
// import Commentdata from "../../dummydata/CommentData";
import CommentReducer from "../reducers/CommentReducer";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../states/contexts/AuthContext";
const initialState = {
  Comments: [],
};
export const CommentContext = createContext(initialState);
const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CommentReducer, initialState);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [refresh, setRefreh] = useState(false);
  const auth = useContext(AuthContext);

  const removeComment = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/comments/${id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      dispatch({
        type: "REMOVE_COMMENT",
        payload: id,
      });
      setRefreh(true);
    } catch (err) {
      console.log(err.message);
    }
  };
  const addComment = async (NewComment) => {
    try {
      await sendRequest(
        "http://localhost:5000/api/comments",
        "POST",
        JSON.stringify({
          thepost: NewComment.thepost,
          creator: auth.userId,
          name: auth.userName,
          text: NewComment.text,
          cimg: auth.userImg,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      dispatch({
        type: "ADD_COMMENT",
        payload: NewComment,
      });
      setRefreh(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const editComment = async (EditedComment) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/comments/${EditedComment.id}`,
        "PATCH",
        JSON.stringify({
          text: EditedComment.text,
          creator: EditedComment.creator,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      dispatch({
        type: "EDIT_COMMENT",
        payload: EditedComment,
      });
      setRefreh(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getComments = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/comments"
      );
      dispatch({
        type: "GET_COMMENTS",
        payload: responseData.comments,
      });
      setRefreh(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        Comments: state.Comments,
        removeComment,
        addComment,
        editComment,
        getComments,
        isLoading,
        error,
        clearError,
        refresh,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
export default CommentContextProvider;
