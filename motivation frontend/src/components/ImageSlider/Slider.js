import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Slider.css";
import { Link } from "react-router-dom";
import landingData from "../../dummydata/Landing";
const Slider = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="Slide"
      fade
    >
      {landingData.map((s) => (
        <Carousel.Item key={s.altt}>
          <Carousel.Caption>
            <h3 className="Stitle">{s.title}</h3>
            <p className="Stext"> {s.description}</p>
            <Link to="#">
              <button className="image-slider-button">{s.buttons}</button>
            </Link>
          </Carousel.Caption>
          <img className="imgs" src={s.pic} alt={s.altt} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default Slider;
