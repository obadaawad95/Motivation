import React from "react";
import DeleteUser from "./DeleteUser";
const User = ({ id, UserName, Birth, email }) => {
  return (
    <tr>
      <td>
        <p> {UserName} </p>
      </td>
      <td>
        <p>{email}</p>
      </td>
      <td>
        <p> {id} </p>
      </td>
      <td>
        <p>{Birth} </p>
      </td>
      <td>
        <DeleteUser id={id} />
      </td>
    </tr>
  );
};
export default User;
