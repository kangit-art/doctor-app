import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUser,
  faClock,
  faCheckCircle,
  faBan,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const statusColors = {
  scheduled: "text-blue-500 ",
  completed: "text-green-500 ",
  canceled: "text-red-500 "
};

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  
  useEffect(() => {
    const patientId = localStorage.getItem("userId");

    const fetchPatientData = async () => {
      try {
        if (patientId) {
          const response = await axios.get(
            `http://localhost:5000/appointment/patient/${patientId}`,
            {
              headers: {
                Authorization: `${token}`
              }
            }
          );

          const data = response.data;
          setAppointments(data.appointment);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [token]);


  const breadcrumbs = [{title:"Go To DashBoard", link: "/patient-dashboard" } ];
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen font-sans">
        <ToastContainer position="top-right" autoClose={3000} />{" "}
        <header className="bg-blue-600 text-white py-4 fixed top-0 w-full z-10 flex justify-between items-center">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-semibold">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-4xl" />
              Welcome,
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
        <div className="container mx-auto py-8 mt-12 w-[95%]">
          <Breadcrumb items={breadcrumbs} />
          <div className="border border-gray-300 p-6 rounded-lg mt-8">
            <h2 className="text-3xl font-semibold mt-8 text-blue-600">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2 text-4xl" />
              Appointments
            </h2>
            <p className="text-lg text-gray-600">
              Total Appointments: {appointments.length}
            </p>
          </div>

          <hr className="my-6 border-t border-gray-300" />

          <div className="mt-8">
            {appointments.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white text-gray-800 border-collapse rounded-lg overflow-hidden text-center">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white text-center">
                      <th className="px-6 py-4 text-lg">Patient</th>
                        <th className="px-6 py-4 text-lg">Doctor</th>
                        <th className="px-6 py-4 text-lg">Date</th>
                       
                        <th className="px-6 py-4 text-lg">Disease</th>
                        <th className="px-6 py-4 text-lg">Status</th>
                    
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment, index) => (
                        <tr
                          key={appointment._id}
                          className={`group transition-all hover:bg-indigo-200 ${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          }`}
                        >
                          <td className="px-6 py-4 text-lg">{`${appointment.patient.name}`}</td>
                          <td className="px-6 py-4 text-lg">{`${appointment.doctor.name}`}</td>
                          <td className="px-6 py-4 text-lg">
                            {appointment.appointmentDate}
                          </td>
                          
                          <td className="px-6 py-4 text-lg group-hover:overflow-visible relative">
                            <span className="">{appointment.disease}</span>
                          </td>
                          <td
                                className={`px-4 py-2 text-lg ${
                                  statusColors[appointment.status]
                                }`}
                              >
                                {appointment.status}
                                <span className="mr-2 ml-3">
                                  {appointment.status === "scheduled" && (
                                    <FontAwesomeIcon icon={faClock} />
                                  )}
                                  {appointment.status === "completed" && (
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                  )}
                                  {appointment.status === "canceled" && (
                                    <FontAwesomeIcon icon={faBan} />
                                  )}
                                </span>
                                </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAppointment;
