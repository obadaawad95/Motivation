import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrModal from "../components/ErrModal/ErrModal";
import EditAboutus from "../components/EditAboutus";
import { useHttpClient } from "../hooks/http-hook";

const AboutUs = () => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [title, setTitle] = useState("");
  const [aboutus, setAboutus] = useState("");
  const [ab, setAb] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/admin/aboutus/${"5ee536689258fd3df4ee4e60"}`
        );
        setAb(responseData.aboutus);
        setTitle(responseData.aboutus.title);
        setAboutus(responseData.aboutus.description);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  return (
    <>
      <ErrModal clearError={clearError} error={error} />
      {isLoading && (
        <div className="center">
          <CircularProgress color="inherit" />
        </div>
      )}
      {!isLoading && (
        <div>
          <h1
            style={{
              color: "#B93946",
              backgroundColor: "#868585",
              margin: "0px 40%",
            }}
          >
            Title :
          </h1>
          <h1>{title}</h1>
          <br />
          <br />
          <br />
          <h3
            style={{
              color: "#B93946",
              backgroundColor: "#868585",
              margin: "0px 40%",
            }}
          >
            Description :
          </h3>
          <h3>{aboutus}</h3>
          <br />
          <br />
          <EditAboutus ab={ab} />
        </div>
      )}
    </>
  );
};

export default AboutUs;
