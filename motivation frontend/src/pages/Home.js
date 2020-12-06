import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "../components/ImageSlider/Slider";
import Papers from "../components/Wallpaper/Paper";
import Widecard from "../components/WideCard/Widecard";
import Aboutus from "../components/Aboutus/Aboutus";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Cats from "../components/Home/Cats";
const Home = () => {
  return (
    <div className="center">
      <Header bool={false} num={250} top="top" /> <Papers />
      <div className="AAA">
        <div className="jss5 jss6">
          <br />

          <Cats />
          <div className="containH">
            <Widecard title="You can share posts and discuss problems with others.." />
            {/* <Slider /> */}
          </div>
          <br />
        </div>
        <Aboutus />
        <Footer
          background={"#E5E5E5"}
          socialIconColor={"#B93946"}
          socialLinkColor={"#B93946"}
          color={"#E5E5E5"}
        />
      </div>
    </div>
  );
};
export default Home;
