import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faSignOutAlt,
  faUserMd
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { AuthContext } from "../../Context/AuthContext";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="bg-blue-600 text-white py-4 fixed top-0 w-full z-10 flex justify-between items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold">
            <FontAwesomeIcon icon={faUserMd} className="mr-2 text-4xl" />
            Doctor Dashboard
          </h1>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-full focus:outline-none focus:shadow-outline-red active:bg-red-800 transform hover:scale-105 transition-transform duration-300 ease-in-out mr-4 flex"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 mt-1" />
          <h1>Logout</h1>
        </button>
      </header>

      <div className="container mx-auto max-w-screen-xl p-8 mt-12">
        <div className="mt-18 text-right flex items-center justify-end space-x-2 relative sm:mt-26 md:mt-26">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 transform hover:scale-105 transition-transform duration-300 ease-in-out "
            onClick={() => {
              navigate("/myappointment");
            }}
          >
            <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
            My Appointment
          </button>
        </div>
    
      </div>
      <Footer />
    </>
  );
};

export default DoctorDashboard;
