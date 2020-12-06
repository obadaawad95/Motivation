import React from "react";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import { Link } from "react-router-dom";
import "./Widecard.css";
const Widecard = ({ title }) => {
  return (
    <div className="rootwide">
      <p className="headerr"> {title} </p>
      <Link to="/Postspage">
        <button className="wide-card-button">
          Explore <ChevronRightRounded />
        </button>
      </Link>
    </div>
  );
};
export default Widecard;
