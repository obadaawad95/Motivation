import React, { createContext, useReducer } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import BooksReducer from "../reducers/BooksReducer";
const initialState = {
  Books: [],
};

export const BooksContext = createContext(initialState);

const BooksContextProvider = (props) => {
  const [state, dispatch] = useReducer(BooksReducer, initialState);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const removeBook = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/books/${id}`,
        "DELETE",
        null
      );
      dispatch({
        type: "REMOVE_BOOK",
        payload: id,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const editBook = async (EditedBook) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/books/${EditedBook.id}`,
        "PATCH",
        JSON.stringify({
          title: EditedBook.title,
          undertitle: EditedBook.undertitle,
          description: EditedBook.description,
          //   pic: EditedBook.pic,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      dispatch({
        type: "EDIT_BOOK",
        payload: EditedBook,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const addBook = async (createdBook) => {
    try {
      const formData = new FormData();
      formData.append("thecat", createdBook.thecat);
      formData.append("title", createdBook.title);
      formData.append("undertitle", createdBook.undertitle);
      formData.append("description", createdBook.description);
      formData.append("image", createdBook.image);
      await sendRequest("http://localhost:5000/admin/books", "POST", formData);
      dispatch({
        type: "ADD_BOOK",
        payload: createdBook,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getBooks = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/admin/books"
      );
      dispatch({
        type: "GET_BOOKS",
        payload: responseData.book,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        Books: state.Books,
        getBooks,
        removeBook,
        editBook,
        addBook,
        isLoading,
        clearError,
        error,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};
export default BooksContextProvider;
