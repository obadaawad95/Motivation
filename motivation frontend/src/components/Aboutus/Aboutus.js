import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import "./Aboutus.css";
const Aboutuspage = () => {
  const { sendRequest } = useHttpClient();
  const [title, setTitle] = useState("");
  const [aboutus, setAboutus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/admin/aboutus/${"5ee536689258fd3df4ee4e60"}`
        );
        setTitle(responseData.aboutus.title);
        setAboutus(responseData.aboutus.description);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  return (
    <div className="aboutus-card">
      <p className="aboutus-title">{title} </p>
      <p className="aboutus-text">{aboutus}</p>
    </div>
  );
};
export default Aboutuspage;
