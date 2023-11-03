import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="carousel_image"
          src="dog1.jpeg"
          alt="home page picture of dog"
        ></img>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carousel_image"
          src="dog2.jpeg"
          alt="home page picture of dog"
        ></img>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="carousel_image"
          src="dog3.jpeg"
          alt="home page picture of dog"
        ></img>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
