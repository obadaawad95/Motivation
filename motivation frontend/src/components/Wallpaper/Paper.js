import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../states/contexts/AuthContext";
import "./Paper.css";
const Papers = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="wall-image">
      <div className="wall-text">
        <h1 style={{ fontSize: "7vw", padding: "10px", fontWeight: "bold" }}>
          MOTIVEHUB
        </h1>
        <h3 style={{ padding: "10px", fontSize: "3vw" }}>WE HELP YOU GROW</h3>

        {!auth.isLoggedIn && (
          <Link to="/Loginpage">
            <button
              style={{ padding: "20px", fontSize: "18px", marginTop: "25px" }}
              className="post-button"
            >
              JOIN US NOW
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Papers;
