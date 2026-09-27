import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Booking from "../Components/Booking";
import { axiosInstance } from "../Service/axiosInst";

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const [userTab, setUserTab] = useState(null);
  const activeTab = userTab ?? (searchParams.get("action") === "inquiry" ? "inquiry" : "booking");
  const setActiveTab = (tab) => setUserTab(tab);

  // General inquiry form state
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Counseling Inquiry",
    message: "",
  });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState(null);

  const handleInquiryChange = (e) => {
    setInquiryData({
      ...inquiryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);
    setInquiryStatus(null);

    try {
      const res = await axiosInstance.post("/api/contact", inquiryData);
      setInquiryStatus({
        type: "success",
        text: res.data.message || "Message sent successfully! Our team will respond shortly.",
      });
      setInquiryData({
        name: "",
        email: "",
        phone: "",
        subject: "General Counseling Inquiry",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting contact inquiry:", err);
      setInquiryStatus({
        type: "error",
        text: err.message || "Failed to send message. Please try again.",
      });
    } finally {
      setInquiryLoading(false);
    }
  };

  return (
    <div className="bg-[#f7fbfa] min-h-screen">
      {/* Header Banner */}
      <div className="border-b border-slate-100 bg-white py-14 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                Get In Touch
              </span>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Contact & Appointment Booking
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Have questions or ready to begin? You can book a direct session or send our team an inquiry below.
              </p>
            </div>

            {/* Toggle tabs */}
            <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200 self-start md:self-auto">
              <button
                onClick={() => setActiveTab("booking")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === "booking"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                📅 Book a Session
              </button>
              <button
                onClick={() => setActiveTab("inquiry")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === "inquiry"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ✉ Send a Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="py-10">
        {activeTab === "booking" ? (
          <Booking />
        ) : (
          <section className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-900">
                Send Us an Inquiry
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Have questions about our therapy plans, counselor availability, or pricing? Drop us a note.
              </p>

              {inquiryStatus && (
                <div
                  className={`mt-6 rounded-xl p-4 text-sm font-medium ${
                    inquiryStatus.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {inquiryStatus.text}
                </div>
              )}

              <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={inquiryData.name}
                      onChange={handleInquiryChange}
                      required
                      placeholder="e.g. Aditi Roy"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={inquiryData.email}
                      onChange={handleInquiryChange}
                      required
                      placeholder="e.g. aditi@example.com"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={inquiryData.phone}
                      onChange={handleInquiryChange}
                      placeholder="+91 98765 43210"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Inquiry Subject
                    </label>
                    <select
                      name="subject"
                      value={inquiryData.subject}
                      onChange={handleInquiryChange}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="General Counseling Inquiry">General Counseling Inquiry</option>
                      <option value="Fee & Insurance Questions">Fee & Insurance Questions</option>
                      <option value="Corporate / Student Wellness">Corporate / Student Wellness</option>
                      <option value="Counselor Partnership">Counselor Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={inquiryData.message}
                    onChange={handleInquiryChange}
                    required
                    placeholder="Write your questions or notes here..."
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquiryLoading}
                  className="w-full rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition disabled:opacity-60"
                >
                  {inquiryLoading ? "Sending Message..." : "Submit Message"}
                </button>
              </form>
            </div>
          </section>
        )}
      </div>

      {/* Contact Cards Info */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          <div className="rounded-3xl bg-[#f1f8f6] p-7 transition hover:shadow-md border border-emerald-100">
            <span className="text-3xl">📧</span>
            <h3 className="mt-4 text-base font-bold text-slate-900">Email Us</h3>
            <p className="mt-1 text-xs text-slate-500">We usually respond within 4 hours</p>
            <a href="mailto:support@mindcare.com" className="mt-3 block font-semibold text-emerald-700 text-sm hover:underline">
              support@mindcare.com
            </a>
          </div>

          <div className="rounded-3xl bg-[#f1f8f6] p-7 transition hover:shadow-md border border-emerald-100">
            <span className="text-3xl">📞</span>
            <h3 className="mt-4 text-base font-bold text-slate-900">Call / WhatsApp</h3>
            <p className="mt-1 text-xs text-slate-500">Mon - Sat: 9:00 AM to 8:00 PM</p>
            <a href="tel:+919876543210" className="mt-3 block font-semibold text-emerald-700 text-sm hover:underline">
              +91 98765 43210
            </a>
          </div>

          <div className="rounded-3xl bg-[#f1f8f6] p-7 transition hover:shadow-md border border-emerald-100">
            <span className="text-3xl">📍</span>
            <h3 className="mt-4 text-base font-bold text-slate-900">Clinic Location</h3>
            <p className="mt-1 text-xs text-slate-500">In-person consultations by appointment</p>
            <p className="mt-3 font-semibold text-slate-800 text-sm">
              Arera Colony, Bhopal, MP 462016
            </p>
          </div>
        </div>

        {/* Crisis notice */}
        <div className="mx-auto mt-10 max-w-4xl px-4 text-center">
          <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900">
            <span className="font-bold">⚠️ Urgent Mental Health Crisis Helpline:</span> If you or someone you know is in immediate distress, please call Tele-MANAS at <a href="tel:14416" className="font-bold underline">14416</a> or Kiran Helpline at <a href="tel:18005990019" className="font-bold underline">1800-599-0019</a> (Toll-Free, 24/7).
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;