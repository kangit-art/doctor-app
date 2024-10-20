const express = require("express");
const {
  registerUser,
  loginUser,
  getPatientById,
  getDoctorList
} = require("../controller/user-controller");
const { authentication } = require("../../adapter/middleware/Jwt-authentication");
const { authorisation } = require("../../adapter/middleware/role-based-authentication");
const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/doctorlist", getDoctorList);
UserRouter.get("/:patientId",authentication,authorisation(["patient"]), getPatientById);

module.exports = UserRouter;
