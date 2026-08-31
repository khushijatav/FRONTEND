import React from "react";

import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Counselors from "../components/Counselors";
import Testimonials from "../components/Testimonials";
import Booking from "../components/Booking";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Counselors />
      <Testimonials />
      <Booking />
    </>
  );
};

export default Home;
