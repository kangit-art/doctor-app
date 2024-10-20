import { Route, Routes } from "react-router-dom";
import RegistrationForm from "../Pages/RegistrationForm";
import AppointmentForm from "../Pages/Patient/AppointmentForm";
import Login from "../Pages/Login";
import PatientDashboard from "../Pages/Patient/PatientDashboard";
import DoctorDashboard from "../Pages/Doctor/DoctorDashboard,";
import MyAppointment from "../Pages/Patient/MyAppointment";
import { Privateroutes } from "./Privateroutes";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-dashboard" element={<Privateroutes><PatientDashboard /></Privateroutes>} />
        <Route path="/doctor-dashboard" element={<Privateroutes><DoctorDashboard /></Privateroutes>} />
        <Route path="/myappointment" element={<Privateroutes><MyAppointment /></Privateroutes>} />
        <Route path="/newappointment" element={<Privateroutes><AppointmentForm /></Privateroutes>} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
