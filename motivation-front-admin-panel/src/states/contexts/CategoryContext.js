import React, { createContext, useReducer } from "react";
import CategoryReducer from "../reducers/CategoryReducer";
import { useHttpClient } from "../../hooks/http-hook";
const initialState = {
  Cats: [],
};
export const CategoryContext = createContext(initialState);
const CategoryContextProvider = (props) => {
  const [state, dispatch] = useReducer(CategoryReducer, initialState);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const removecategory = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/cat/${id}`,
        "DELETE",
        null
      );
      dispatch({
        type: "REMOVE_CAT",
        payload: id,
      });
    } catch (err) {}
  };
  const editcategory = async (EditedCat) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/cat/${EditedCat.id}`,
        "PATCH",
        JSON.stringify({
          type: EditedCat.type,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      dispatch({
        type: "EDIT_CAT",
        payload: EditedCat,
      });
    } catch (err) {}
  };
  const addcategory = async (createdCat) => {
    try {
      const formData = new FormData();
      formData.append("type", createdCat.type);
      formData.append("image", createdCat.image);
      await sendRequest("http://localhost:5000/admin/cat", "POST", formData);

      dispatch({
        type: "ADD_CAT",
        payload: createdCat,
      });
    } catch (err) {}
  };
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
        removecategory,
        addcategory,
        editcategory,
        getcategory,
        isLoading,
        error,
        clearError,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
