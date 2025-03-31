import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold text-gray-800">Welcome to our Hotel</h2>
        <p className="mt-4 text-lg text-gray-600">Experience luxury and comfort with our premium rooms!</p>
      </div>
    </div>
  );
};

export default Home;
