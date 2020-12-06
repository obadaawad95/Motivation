import React, { useContext } from "react";
import "./Minicard.css";

const Groupcard = ({ text, img }) => {
  return (
    <div className="minicard-container">
      <button
        className="animated-button minicard-root"
        style={{
          height: "300px",
          // backgroundImage: `url(http://localhost:5000/${img})`,
        }}
      >
        <img
          src={`http://localhost:5000/${img}`}
          style={{ width: "100%", height: "300px" }}
        />
        <div className="imgtext">{text} </div>
      </button>
    </div>
  );
};
export default Groupcard;
