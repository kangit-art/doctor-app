const express = require("express");
const {
  createAppointment,
  getDoctorAppointmentById,
  getPatientAppointmentById
} = require("../controller/appointment-controller");
const AppointmentRouter = express.Router();
const { authentication } = require("../../adapter/middleware/Jwt-authentication");
const { authorisation } = require("../../adapter/middleware/role-based-authentication");

AppointmentRouter.post("/",authentication,authorisation(["patient","doctor"]),createAppointment);
AppointmentRouter.get("/doctor/:doctorId", authentication,authorisation(["doctor"]), getDoctorAppointmentById);
AppointmentRouter.get("/patient/:patientId", authentication,authorisation(["patient"]), getPatientAppointmentById);

module.exports = AppointmentRouter;
