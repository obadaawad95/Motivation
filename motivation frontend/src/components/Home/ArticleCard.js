import React from "react";
import "./ArticleCard.css";

const ArticleCard = ({ title, undertitle, img, descreption }) => {
  return (
    <div className="article-card">
      <img
        src={`http://localhost:5000/${img}`}
        alt={title}
        style={{ width: "100%" }}
      />
      <div className="article-container">
        <h4>
          <b>{title}</b>
        </h4>
        <p>{undertitle}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
