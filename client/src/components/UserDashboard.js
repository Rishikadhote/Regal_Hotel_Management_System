import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bookings/")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load bookings.");
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      className="p-6 bg-white/10 backdrop-blur-lg shadow-xl rounded-lg border border-gray-300/20"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-white text-center mb-4">Your Bookings</h2>

      {loading && <p className="text-white text-center">Loading...</p>}
      {error && <p className="text-red-400 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3">Room</th>
              <th className="p-3">Check-In</th>
              <th className="p-3">Check-Out</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="text-center border-b border-gray-700">
                <td className="p-3">{booking.room}</td>
                <td className="p-3">{booking.check_in}</td>
                <td className="p-3">{booking.check_out}</td>
                <td className={`p-3 font-bold ${booking.paid ? "text-green-400" : "text-red-400"}`}>
                  {booking.paid ? "Paid" : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
