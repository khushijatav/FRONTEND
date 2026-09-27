import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-lg text-white font-bold">
                ☘
              </div>
              <span className="text-xl font-bold text-slate-900">MindCare</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-500 leading-relaxed">
              Providing safe, ethical, and confidential counseling and mental health services. Helping you regain balance, confidence, and peace of mind.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Navigation</h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-emerald-700 transition">Home</Link>
              <Link to="/services" className="hover:text-emerald-700 transition">Services Catalog</Link>
              <Link to="/services#counselor-bookings" className="hover:text-emerald-700 transition">Counselor Desk</Link>
              <Link to="/counselors" className="hover:text-emerald-700 transition">Find Counselors</Link>
              <Link to="/about" className="hover:text-emerald-700 transition">About Us</Link>
              <Link to="/contact" className="hover:text-emerald-700 transition">Contact & Booking</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Support & Clinic</h4>
            <p className="mt-3 text-xs text-slate-500">
              Arera Colony, Bhopal, MP<br />
              Mon - Sat: 9:00 AM - 8:00 PM
            </p>
            <p className="mt-2 text-xs font-semibold text-emerald-700">
              support@mindcare.com
            </p>
            <p className="mt-1 text-xs font-semibold text-emerald-700">
              +91 98765 43210
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} MindCare Counseling. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Confidentiality Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
