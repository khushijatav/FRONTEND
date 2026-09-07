import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import CounselorsPage from "./pages/CounselorsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServiceDetail from "./pages/ServiceDetail";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f7fbfa] text-slate-800">

        {/* Navbar */}
        <Navbar />

        {/* Pages */}
        <main>
          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Services */}
            <Route
              path="/services"
              element={<ServicesPage />}
            />
            {/* Service Detail */}
            <Route
              path="/services/:id"
              element={<ServiceDetail />}
            />

            {/* Counselors */}
            <Route
              path="/counselors"
              element={<CounselorsPage />}
            />

            {/* About */}
            <Route
              path="/about"
              element={<AboutPage />}
            />

            {/* Contact + Booking */}
            <Route
              path="/contact"
              element={<ContactPage />}
            />

            {/* If wrong URL */}
            <Route
              path="*"
              element={<Home />}
            />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
};

export default App;