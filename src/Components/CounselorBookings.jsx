import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../Service/axiosInst";

const STORAGE_KEY = "mindcare_counselor_bookings";

const getCachedBookings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const CounselorBookings = ({ refreshTrigger }) => {
  const [bookings, setBookings] = useState(getCachedBookings);
  const [loading, setLoading] = useState(() => getCachedBookings().length === 0);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = useCallback(async (isInitial = false) => {
    if (!isInitial && bookings.length === 0) {
      setLoading(true);
    }
    try {
      const params = {};
      if (statusFilter !== "All") params.status = statusFilter;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const response = await axiosInstance.get("/api/bookings", { params });
      setError("");
      if (Array.isArray(response.data)) {
        setBookings(response.data);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        } catch (e) {}
      }
    } catch (err) {
      console.warn("Could not reach backend bookings API, maintaining cached state:", err.message);
      const cached = getCachedBookings();
      if (cached.length > 0) {
        // Filter cached if needed
        let filtered = cached;
        if (statusFilter !== "All") filtered = filtered.filter((b) => b.status === statusFilter);
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (b) =>
              (b.name && b.name.toLowerCase().includes(q)) ||
              (b.service && b.service.toLowerCase().includes(q))
          );
        }
        setBookings(filtered);
        setError("");
      } else {
        setError("Unable to load live booking details. Please ensure the backend is running.");
      }
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchBookings(true);
  }, [fetchBookings, refreshTrigger]);

  // Handle status update by counselor
  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const res = await axiosInstance.patch(`/api/bookings/${id}/status`, {
        status: newStatus,
      });

      // Update state and localStorage
      setBookings((prev) => {
        const updated = prev.map((b) => (b._id === id ? { ...b, status: res.data.booking.status } : b));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    } catch (err) {
      console.error("Failed to update status on server:", err);
      // Still update locally so counselor view is responsive
      setBookings((prev) => {
        const updated = prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle deleting a booking
  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to remove this booking request?")) return;
    try {
      setUpdatingId(id);
      await axiosInstance.delete(`/api/bookings/${id}`);
    } catch (err) {
      console.warn("Server delete warning:", err.message);
    } finally {
      setBookings((prev) => {
        const updated = prev.filter((b) => b._id !== id);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default: // Pending
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case "Online Video":
        return "🎥 Online Video";
      case "Voice Call":
        return "📞 Voice Call";
      case "In-Person Clinic":
        return "🏥 Clinic Visit";
      default:
        return "💻 " + mode;
    }
  };

  return (
    <section id="counselor-bookings" className="py-14 bg-slate-50 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Counselor Desk View
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Client Session Bookings & Requests
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              All bookings submitted through the booking form appear here in real time for counselors to view and manage.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchBookings(false)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-emerald-700 transition"
              title="Refresh Bookings"
            >
              <svg
                className={`h-4 w-4 ${loading ? "animate-spin text-emerald-600" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </button>
            <span className="rounded-xl bg-emerald-600/10 px-3 py-2 text-xs font-bold text-emerald-800 border border-emerald-200">
              Total: {bookings.length}
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  statusFilter === st
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client or service..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && bookings.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center py-16 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading client booking cards...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-semibold text-red-700">{error}</p>
            <button
              onClick={() => fetchBookings(false)}
              className="mt-3 rounded-lg bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && bookings.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl text-emerald-600">
              📋
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No Session Bookings Found
            </h3>
            <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
              {searchQuery || statusFilter !== "All"
                ? "No bookings match your current search or filter."
                : "Clients haven't submitted any booking requests yet. Once someone books a session through the form, their details will display right here in a card."}
            </p>
            <a
              href="#booking-section"
              className="mt-5 inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
            >
              Book a Test Session Below
            </a>
          </div>
        )}

        {/* Booking Cards Grid */}
        {!loading && bookings.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                {/* Top: Client Info & Status */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 font-bold text-white shadow-sm">
                        {booking.name ? booking.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 leading-snug">
                          {booking.name}
                        </h4>
                        <span className="inline-block text-xs text-slate-500">
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Recent"}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-bold capitalize ${getStatusBadge(
                        booking.status
                      )}`}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </div>

                  {/* Service Badge */}
                  <div className="mt-4 rounded-xl bg-emerald-50/80 p-2.5 border border-emerald-100/70">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Requested Service
                    </p>
                    <p className="text-sm font-bold text-emerald-950 mt-0.5">
                      {booking.service}
                    </p>
                  </div>

                  {/* Session Details List */}
                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 w-20">Counselor:</span>
                      <span className="text-slate-900 font-medium truncate">
                        {booking.counselor || "Any Available"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 w-20">Date & Slot:</span>
                      <span className="text-slate-900 font-medium">
                        🗓 {booking.date} • {booking.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 w-20">Mode:</span>
                      <span className="font-medium text-slate-900">
                        {getModeIcon(booking.mode)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 w-20">Email:</span>
                      <a
                        href={`mailto:${booking.email}`}
                        className="text-emerald-700 hover:underline truncate"
                        title={booking.email}
                      >
                        ✉ {booking.email}
                      </a>
                    </div>

                    {booking.phone && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700 w-20">Phone:</span>
                        <a
                          href={`tel:${booking.phone}`}
                          className="text-emerald-700 hover:underline"
                        >
                          📞 {booking.phone}
                        </a>
                      </div>
                    )}

                    {booking.notes && (
                      <div className="mt-2.5 rounded-lg bg-slate-50 p-2.5 border border-slate-100 text-slate-600 italic">
                        "{booking.notes}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom: Counselor Controls */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    {/* Status Changer */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-slate-500">
                        Update:
                      </span>
                      <select
                        value={booking.status || "Pending"}
                        disabled={updatingId === booking._id}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      disabled={updatingId === booking._id}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                      title="Delete Booking Record"
                      aria-label="Delete booking"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default CounselorBookings;
