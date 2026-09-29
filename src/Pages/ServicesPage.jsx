import { useState } from "react";
import Services from "../Components/Services";
import CounselorBookings from "../Components/CounselorBookings";
import Booking from "../Components/Booking";

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const hash = window.location.hash;
      if (hash === "#counselor-bookings" || hash === "#bookings") return "bookings";
      if (hash === "#book-now") return "book-now";
      const saved = sessionStorage.getItem("mindcare_services_tab");
      return saved || "services";
    } catch {
      return "services";
    }
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const changeTab = (tab) => {
    setActiveTab(tab);
    try {
      sessionStorage.setItem("mindcare_services_tab", tab);
    } catch (e) {}
  };

  const handleBookingSuccess = () => {
    // Increment trigger to reload bookings in CounselorBookings component
    setRefreshTrigger((prev) => prev + 1);
    // Switch tab to bookings so counselor/user can view the newly added card!
    changeTab("bookings");
  };

  return (
    <div className="min-h-screen bg-[#f7fbfa]">
      {/* Page Hero Banner */}
      <div className="border-b border-slate-100 bg-white py-14 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                Mental Health Programs & Sessions
              </span>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Services & Counselor Desk
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Explore our therapeutic care offerings, book a consultation, or view live client booking cards as a counselor.
              </p>
            </div>

            {/* View Selector Switch */}
            <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200 self-start md:self-auto">
              <button
                onClick={() => changeTab("services")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === "services"
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🌿 Browse Services
              </button>
              <button
                onClick={() => changeTab("bookings")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === "bookings"
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>📋 Counselor Desk (Cards)</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
              <button
                onClick={() => changeTab("book-now")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === "book-now"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                + Book a Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections based on Active Tab */}
      <div className="space-y-12 pb-16">
        {activeTab === "services" && (
          <div>
            <Services showHeader={false} />
            
            {/* Always also show Counselor Bookings below the services list */}
            <div className="mt-8">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
                <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent p-6 border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Looking for incoming client session requests?
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Counselors can view all client forms submitted on the platform below.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="shrink-0 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-800 transition"
                  >
                    Go To Counselor Cards View →
                  </button>
                </div>
              </div>
              <CounselorBookings refreshTrigger={refreshTrigger} />
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <CounselorBookings refreshTrigger={refreshTrigger} />
          </div>
        )}

        {activeTab === "book-now" && (
          <div className="pt-6">
            <Booking onBookingSuccess={handleBookingSuccess} />
            {/* Show incoming bookings right below form */}
            <CounselorBookings refreshTrigger={refreshTrigger} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
