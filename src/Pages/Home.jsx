import Hero from "../Components/Hero";
import Services from "../Components/Services";
import About from "../Components/About";
import Counselors from "../Components/Counselors";
import Testimonials from "../Components/Testimonials";
import Booking from "../Components/Booking";

const Home = () => {
  return (
    <>
      <Hero />
      <Services limit={4} />
      <About />
      <Counselors limit={3} />
      <Testimonials />
      <Booking />
    </>
  );
};

export default Home;
