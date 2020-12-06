import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import "./CatCard.css";
function Groupcard({ text, color }) {
  return (
    <div className="rootMC" style={{ backgroundColor: color }}>
      <CardActionArea className="CardActionArea">
        <div className="contentMC">
          <h1>{text} </h1>
        </div>
      </CardActionArea>
    </div>
  );
}
export default Groupcard;
