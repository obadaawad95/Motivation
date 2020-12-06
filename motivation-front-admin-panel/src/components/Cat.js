import React from "react";
import DeleteCat from "./DeleteCat";
import EditCat from "./EditCat";
const Cat = ({ id, type }) => {
  return (
    <tr>
      <td>
        <p> {id} </p>
      </td>
      <td>
        <p> {type} </p>
      </td>
      <td>
        <DeleteCat id={id} />
        <EditCat id={id} />
      </td>
    </tr>
  );
};

export default Cat;
