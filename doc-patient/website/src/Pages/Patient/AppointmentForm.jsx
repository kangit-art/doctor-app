import React, { useContext, useState,useEffect } from "react";
import axios from "axios";
import {
  faCalendarAlt,
  faClock,
  faExclamationCircle,
  faSave,
  faSignOutAlt,
  faUserMd
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";

const AppointmentForm = () => {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const token = localStorage.getItem("token");
  const patientId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    patient: patientId,
    doctor: patientId,
    appointmentDate: "",
    time: "",
    status: "scheduled",
    disease: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "appointmentDate" ||
      name === "time"
    ) {
      const selectedDate = new Date(value);

      if (selectedDate < new Date()) {
        toast.error(`${name} cannot be set to a past date or time.`, {
          position: "top-right",
          autoClose: 3000
        });

        setAppointmentData({
          ...appointmentData,
          [name]: appointmentData[name]
        });
        return;
      }
    }
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  useEffect(() => {
     const fetchPatientData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/user/doctorlist`,
          {
            headers: {
              authorization: `${token}`
            }
          }
        );
        setDoctorList(response.data.doctorsList);

      } catch (error) {
        console.error("Error fetching Doctor list data:", error);
      }
    };

    fetchPatientData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("formData", appointmentData);
      const response = await axios.post(
        "http://localhost:5000/appointment",
        appointmentData,
        {
          headers: {
            authorization: `${token}`
          }
        }
      );
       
      if (response.data.status) {
        toast.success("Appointment successful!");
        navigate("/myappointment");
      } else {
        toast.error("Appointment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error Appointment:", error);
      toast.error(
        "An error occurred while Appointment. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <>
     <header className="bg-blue-600 text-white py-4 fixed top-0 w-full z-10 flex justify-between items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold">
            <FontAwesomeIcon icon={faUserMd} className="mr-2 text-4xl" />
            Patient Dashboard
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
    <div className="flex justify-center items-center h-screen bg-cover "style={{ backgroundImage: "url('/background.webp')" }}>
      <div className="bg-opacity-10 backdrop-blur-xl w-full max-w-md p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-indigo-600">
            Book Appointment
          </h2>
         
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-indigo-600 text-bold text-sm font-bold mb-2">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-2 text-indigo-600"
              />
              Appointment Date
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={appointmentData.appointmentDate}
              onChange={handleInputChange}
              className="w-full border-2 border-indigo-600 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-600 text-sm font-bold mb-2">
              <FontAwesomeIcon
                icon={faClock}
                className="mr-2 text-indigo-600"
              />
               Time
            </label>
            <input
              type="time"
              name="time"
              value={appointmentData.time}
              onChange={handleInputChange}
              className="w-full border-2 border-indigo-600 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              required
            />
          </div>
         
          <div className="mb-4">
            <label className="block text-indigo-600 text-sm font-bold mb-2">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="mr-2 text-indigo-600"
              />
              Disease
            </label>
            <input
              type="text"
              name="disease"
              value={appointmentData.disease}
              onChange={handleInputChange}
              className="w-full border-2 border-indigo-600 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-600 text-sm font-bold mb-2">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="mr-2 text-indigo-600"
              />
              Select Doctor
            </label>
            <select
              name="doctor"
              value={appointmentData.doctor}
              onChange={handleInputChange}
              className="w-full border-2 border-indigo-600 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              required
            >
              <option value=" ">Select a doctor</option>
              {doctorList && doctorList.length > 0 ? (
                  doctorList.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))
                ) : (
                  <option value="">No doctors available</option>
                )}
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              {isLoading ? " Book Appointmenting..." : " Book Appointment"}{" "}
             
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default AppointmentForm;
