import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import ServicesPage from "./Pages/ServicesPage";
import CounselorsPage from "./Pages/CounselorsPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import ServiceDetail from "./Pages/ServiceDetail";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f7fbfa] text-slate-800 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
        <div>
          {/* Global Header */}
          <Navbar />

          {/* Main Routed Content */}
          <main>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Services & Counselor Bookings Desk */}
              <Route path="/services" element={<ServicesPage />} />

              {/* Service Detail */}
              <Route path="/services/:id" element={<ServiceDetail />} />

              {/* Counselors */}
              <Route path="/counselors" element={<CounselorsPage />} />

              {/* About */}
              <Route path="/about" element={<AboutPage />} />

              {/* Contact + Booking */}
              <Route path="/contact" element={<ContactPage />} />

              {/* Fallback to Home if unknown route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;