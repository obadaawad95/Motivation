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
  const removeArticle = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/article/${id}`,
        "DELETE",
        null
      );
      dispatch({
        type: "REMOVE_ARTICLE",
        payload: id,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const editArticle = async (EditedArticle) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/article/${EditedArticle.id}`,
        "PATCH",
        JSON.stringify({
          title: EditedArticle.title,
          undertitle: EditedArticle.undertitle,
          description: EditedArticle.description,
          // pic: EditedBook.pic,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      dispatch({
        type: "EDIT_ARTICLE",
        payload: EditedArticle,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const addArticle = async (createdArticle) => {
    try {
      const formData = new FormData();
      formData.append("thecat", createdArticle.thecat);
      formData.append("title", createdArticle.title);
      formData.append("undertitle", createdArticle.undertitle);
      formData.append("description", createdArticle.description);
      formData.append("image", createdArticle.image);
      await sendRequest(
        "http://localhost:5000/admin/article",
        "POST",
        formData
      );
      dispatch({
        type: "ADD_ARTICLE",
        payload: createdArticle,
      });
    } catch (err) {}
  };
  const getArticles = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/admin/article"
      );
      dispatch({
        type: "GET_ARTICLES",
        payload: responseData.article,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ArticleContext.Provider
      value={{
        Articles: state.Articles,
        removeArticle,
        addArticle,
        editArticle,
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
