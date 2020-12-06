import React, { createContext, useReducer, useContext, useState } from 'react';
import PostReducer from '../reducers/PostReducer';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../states/contexts/AuthContext';
const initialState = {
  Posts: [],
};
export const PostContext = createContext(initialState);

const PostContextProvider = (props) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [refresh, setRefreh] = useState(false);
  const auth = useContext(AuthContext);
  const removePost = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      dispatch({
        type: 'REMOVE_POST',
        payload: id,
      });
      setRefreh(true);
    } catch (err) {}
  };

  const addPost = async (NewPost) => {
    try {
      await sendRequest(
        'http://localhost:5000/api/posts',
        'POST',
        JSON.stringify({
          creator: auth.userId,
          name: auth.userName,
          text: NewPost.text,
          pimg: auth.userImg,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      dispatch({
        type: 'ADD_POST',
        payload: NewPost,
      });
      setRefreh(true);
    } catch (err) {}
  };

  const editPost = async (EditedPost) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${EditedPost.id}`,
        'PATCH',
        JSON.stringify({
          text: EditedPost.text,
          creator: EditedPost.creator,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      dispatch({
        type: 'EDIT_POST',
        payload: EditedPost,
      });
      setRefreh(true);
    } catch (err) {}
  };

  const getPosts = async () => {
    try {
      const responseData = await sendRequest('http://localhost:5000/api/posts');
      dispatch({
        type: 'GET_POSTS',
        payload: responseData.posts,
      });
      setRefreh(false);
    } catch (err) {}
  };

  return (
    <PostContext.Provider
      value={{
        Posts: state.Posts,
        removePost,
        addPost,
        editPost,
        getPosts,
        isLoading,
        error,
        clearError,
        refresh,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
