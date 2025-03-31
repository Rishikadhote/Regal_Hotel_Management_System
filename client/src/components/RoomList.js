import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/rooms/")
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Available Rooms</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`https://source.unsplash.com/400x300/?hotel,room${room.id}`}
              alt="Room"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{room.room_type}</h3>
              <p className="text-gray-600">Room No: {room.room_number}</p>
              <p className="text-gray-800 font-bold">₹{room.price_per_night} / Night</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                {room.is_available ? "Book Now" : "Not Available"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
