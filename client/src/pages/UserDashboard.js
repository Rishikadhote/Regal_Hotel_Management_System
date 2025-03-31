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
      .catch(() => {
        setError("Failed to load bookings.");
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-auto max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
        Your Bookings
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Check-In</th>
              <th className="p-3 text-left">Check-Out</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-300 dark:border-gray-600">
                <td className="p-3">{booking.room}</td>
                <td className="p-3">{booking.check_in}</td>
                <td className="p-3">{booking.check_out}</td>
                <td className={`p-3 font-bold ${booking.paid ? "text-green-500" : "text-red-500"}`}>
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
