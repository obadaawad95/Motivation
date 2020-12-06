import React, { createContext, useState, useReducer, useContext } from "react";
import UserReducer from "../reducers/UserReducer";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../contexts/AuthContext";
const initialState = {
  Users: [],
};
export const UserContext = createContext(initialState);
const UserContextProvider = (props) => {
  const auth = useContext(AuthContext);
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const { clearError, sendRequest, error, isLoading } = useHttpClient();
  const [refresh, setRefresh] = useState(false);

  const getUser = async () => {
    try {
      const responseData = await sendRequest(`http://localhost:5000/api/users`);
      dispatch({
        type: "GET_USER",
        payload: responseData.users,
      });
      setRefresh(false);
    } catch (err) {}
  };

  const editUserInfo = async (EditedInfo) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${EditedInfo.id}`,
        "PATCH",
        JSON.stringify({
          name: EditedInfo.name,
          location: EditedInfo.location,
          job: EditedInfo.job,
          school: EditedInfo.school,
          uni: EditedInfo.university,
          aboutme: EditedInfo.aboutme,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      dispatch({
        type: "EDIT_USERINFO",
        payload: EditedInfo,
      });
      setRefresh(true);
    } catch (err) {}
  };
  const deleteUser = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      dispatch({
        type: "DELETE_USER",
        payload: id,
      });
      setRefresh(true);
    } catch (err) {}
  };
  return (
    <UserContext.Provider
      value={{
        Users: state.Users,
        getUser,
        editUserInfo,
        error,
        clearError,
        isLoading,
        refresh,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
