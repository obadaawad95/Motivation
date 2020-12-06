import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CatDetailsComponent from "../components/Home/CatDetailsComponent";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../states/contexts/CategoryContext";

const CatDetails = () => {
  const image = useParams().cim;
  const title = useParams().ct;
  const undertitle = useParams().cut;
  const { desc, setDesc } = useContext(CategoryContext);

  useEffect(() => {
    const data = localStorage.getItem("desc");
    if (data) {
      setDesc(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("desc", JSON.stringify(desc));
  });

  return (
    <div className="center">
      <Header bool={true} num={-1} />
      <div className="AAA">
        <CatDetailsComponent
          image={image}
          title={title}
          undertitle={undertitle}
          description={desc}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CatDetails;
