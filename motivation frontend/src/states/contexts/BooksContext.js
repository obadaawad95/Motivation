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

  const getBooks = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/admin/books"
      );
      dispatch({
        type: "GET_BOOKS",
        payload: responseData.book,
      });
    } catch (err) {}
  };

  return (
    <BooksContext.Provider
      value={{
        Books: state.Books,
        getBooks,
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
