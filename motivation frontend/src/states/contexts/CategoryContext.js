import React, { createContext, useReducer, useState } from "react";
import CategoryReducer from "../reducers/CategoryReducer";
import { useHttpClient } from "../../hooks/http-hook";
const initialState = {
  Cats: [],
};
export const CategoryContext = createContext(initialState);
const CategoryContextProvider = (props) => {
  const [desc, setDesc] = useState();
  const [state, dispatch] = useReducer(CategoryReducer, initialState);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const getcategory = async () => {
    try {
      const responseData = await sendRequest("http://localhost:5000/admin/cat");
      dispatch({
        type: "GET_CAT",
        payload: responseData.cat,
      });
    } catch (err) {}
  };
  return (
    <CategoryContext.Provider
      value={{
        Cats: state.Cats,
        getcategory,
        isLoading,
        error,
        clearError,
        desc,
        setDesc,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
