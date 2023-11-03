import HomeCarousel from "./HomeCarousel";

function MainPage() {
  return (
    <div className="px-4 py-0 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership management!
        </p>
      </div>
      <div className="home-carousel">
        <HomeCarousel> </HomeCarousel>
      </div>
    </div>
  );
}

export default MainPage;
