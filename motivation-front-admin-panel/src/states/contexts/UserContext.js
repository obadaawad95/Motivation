import React, { createContext, useReducer } from "react";
import UserReducer from "../reducers/UserReducer";
import { useHttpClient } from "../../hooks/http-hook";
const initialState = {
  Users: [],
};
export const UserContext = createContext(initialState);
const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const { clearError, sendRequest, error, isLoading } = useHttpClient();

  const getUser = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/admin/users`
      );
      dispatch({
        type: "GET_USER",
        payload: responseData.users,
      });
    } catch (err) {}
  };
  const deleteUser = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/admin/users/${id}`,
        "DELETE",
        null
      );
      dispatch({
        type: "DELETE_USER",
        payload: id,
      });
    } catch (err) {}
  };
  return (
    <UserContext.Provider
      value={{
        Users: state.Users,
        getUser,
        error,
        clearError,
        isLoading,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
