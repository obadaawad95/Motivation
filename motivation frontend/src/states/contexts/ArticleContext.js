import React, { createContext, useReducer } from "react";
import ArticleReducer from "../reducers/ArticleReducer";
import { useHttpClient } from "../../hooks/http-hook";
const initialState = {
  Articles: [],
};
export const ArticleContext = createContext(initialState);
const ArticleContextProvider = (props) => {
  const [state, dispatch] = useReducer(ArticleReducer, initialState);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const getArticles = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/admin/article"
      );
      dispatch({
        type: "GET_ARTICLES",
        payload: responseData.article,
      });
    } catch (err) {}
  };
  return (
    <ArticleContext.Provider
      value={{
        Articles: state.Articles,
        getArticles,
        isLoading,
        error,
        clearError,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;
