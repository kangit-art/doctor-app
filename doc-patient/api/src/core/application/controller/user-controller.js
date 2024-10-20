const bcrypt = require('bcrypt');
const UserModel = require("../model/user-model");
const jwt=require("jsonwebtoken")

const registerUser = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            console.log('Email already exists!');
            return res.status(400).json({ message: 'Email already exists!', status: false });
        }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = await new UserModel({...req.body,password:hashedPassword});
        newUser.save();

        console.log("Registration successfully");
        res.status(201).json({newUser, message: "Registration successfully", status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        
        const userData = await UserModel.findOne({ email: req.body.email });
        if (!userData) {
            return res.status(400).json({ message: 'Email not found!', status: false });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, userData.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect password!', status: false });
        }
        let token=jwt.sign({userId:userData._id,role:userData.role,email:userData.email},process.env.secretKey);
        console.log("userId1: ", userData._id)
        console.log("userData.role: ",userData)
        
        res.status(200).json({ message: 'Login successful!', status: true, token, role: userData.role, userId: userData._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const patient = await UserModel.findById(patientId).populate('appointments')
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({patient});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getDoctorList = async (req, res) => {
    try { 
        const doctors = await UserModel.find({ role: 'doctor' }).select('_id name');
        if (!doctors) {
            return res.status(404).json({ message: 'doctorList not found' });
        }
        const doctorsList  = doctors.map(doctor => ({ id: doctor._id, name: doctor.name }));
        res.status(200).json({ doctorsList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getPatientById,
    getDoctorList
};
