import React, { useContext, useEffect } from "react";
import User from "../components/User";
import { UserContext } from "../states/contexts/UserContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../components/ErrModal/ErrModal";

const AllUsers = () => {
  const { getUser, Users, isLoading, clearError, error, refresh } = useContext(
    UserContext
  );
  useEffect(() => {
    getUser();
  }, [refresh]);

  if (Users.length === 0 && !isLoading) {
    return (
      <div className="center">
        <h4>There are no Users</h4>
      </div>
    );
  }
  return (
    <>
      <h1>Users </h1>

      <ErrModal clearError={clearError} error={error} />
      {isLoading && (
        <div className="center">
          <CircularProgress color="inherit" />
        </div>
      )}
      {!isLoading && (
        <table>
          <tbody>
            <tr style={{ backgroundColor: "#DDB091" }}>
              <th>
                <p>UserName</p>
              </th>
              <th>
                <p>Email</p>
              </th>
              <th>
                <p>Id</p>
              </th>
              <th>
                <p>BirthDay</p>
              </th>
              <th>...</th>
            </tr>

            {Users.map((u) => (
              <User
                key={u._id}
                id={u._id}
                UserName={u.name}
                Birth={u.age}
                email={u.email}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AllUsers;
