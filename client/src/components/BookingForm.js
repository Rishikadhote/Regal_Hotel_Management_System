import React, { useState } from "react";
import { motion } from "framer-motion";

const BookingForm = () => {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    roomType: "Single",
    checkIn: "",
    checkOut: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!bookingData.name.trim()) newErrors.name = "Name is required";
    if (!bookingData.email.trim()) newErrors.email = "Email is required";
    if (!bookingData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!bookingData.checkOut) newErrors.checkOut = "Check-out date is required";

    if (bookingData.checkIn && bookingData.checkOut && bookingData.checkIn >= bookingData.checkOut) {
      newErrors.checkOut = "Check-out must be after Check-in";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    const requestData = {
      customer_name: bookingData.name,
      customer_email: bookingData.email,
      room: bookingData.roomType === "Single" ? 1 : bookingData.roomType === "Double" ? 2 : 3,
      check_in: bookingData.checkIn,
      check_out: bookingData.checkOut,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const bookingData = await response.json();
        handlePayment(bookingData.amount);
      } else {
        const data = await response.json();
        setMessage(` Booking Failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(" Network Error. Try Again!");
    }

    setLoading(false);
  };

  const handlePayment = (amount) => {
    const options = {
      key: "your_razorpay_key_id",
      amount: amount * 100,
      currency: "INR",
      name: "Hotel Booking",
      description: "Room Booking Payment",
      handler: function (response) {
        alert("Payment Successful: " + response.razorpay_payment_id);
        setMessage(" Booking & Payment Successful!");
        setBookingData({ name: "", email: "", roomType: "Single", checkIn: "", checkOut: "" });
        setErrors({});
      },
      prefill: { name: bookingData.name, email: bookingData.email },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <motion.div
      className="w-full max-w-lg bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-gray-300/20"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl text-white font-bold text-center mb-4">Book a Luxury Stay</h2>

      {message && (
        <motion.p
          className={`text-center text-lg font-semibold ${
            message.includes(".") ? "text-green-400" : "text-red-400"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      )}

      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={bookingData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={bookingData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
        </div>

        <div>
          <select
            name="roomType"
            className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
            value={bookingData.roomType}
            onChange={handleChange}
          >
            <option className="text-black bg-white" value="Single">Single Room</option>
            <option className="text-black bg-white" value="Double">Double Room</option>
            <option className="text-black bg-white" value="Deluxe">Deluxe Room</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="date"
              name="checkIn"
              placeholder="Check-in Date"
              className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
              value={bookingData.checkIn}
              onChange={handleChange}
              min={today}
            />
            {errors.checkIn && <p className="text-red-400 text-sm">{errors.checkIn}</p>}
          </div>
          <div>
            <input
              type="date"
              name="checkOut"
              placeholder="Check-out Date"
              className="w-full p-3 bg-transparent border border-gray-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
              value={bookingData.checkOut}
              onChange={handleChange}
              min={bookingData.checkIn || today}
            />
            {errors.checkOut && <p className="text-red-400 text-sm">{errors.checkOut}</p>}
          </div>
        </div>

        <motion.button
          type="submit"
          className={`w-full p-3 rounded-lg text-lg font-bold transition ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-gold-400 hover:bg-gold-500"
          }`}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
              Processing...
            </motion.span>
          ) : (
            "Proceed to Payment"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BookingForm;
