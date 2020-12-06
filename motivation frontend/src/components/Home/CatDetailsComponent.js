import React from "react";

const CatDetailsComponent = ({ title, undertitle, description, image }) => {
  return (
    <div className="center">
      <br />
      <div class="page-header">
        <h1>{title}</h1>
      </div>
      <br />
      <figure className="margin-b-2">
        <img
          className="img-responsive"
          src={`http://localhost:5000/${image}`}
          alt={title}
        />
        <figcaption className="margin-t-h">{title}</figcaption>
      </figure>
      <p className="lead">{undertitle}</p>
      <p>{description} </p>
    </div>
  );
};

export default CatDetailsComponent;
