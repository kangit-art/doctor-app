const AppointmentModel = require("../model/appointment-model");

const createAppointment = async (req, res) => {
    try {
        const {
            patient,
            doctor,
            appointmentDate,
            time,
            status,
            disease,
        } = req.body;
        
        const newAppointment = new AppointmentModel({
            patient,
            doctor,
            appointmentDate,
            time,
            status,
            disease,
        });
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getDoctorAppointmentById = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        const appointment = await AppointmentModel
            .find({ doctor: doctorId })
            .populate('doctor') 
            .populate('patient')
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPatientAppointmentById = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const appointment = await AppointmentModel
            .find({ patient: patientId })
            .populate('doctor')
            .populate('patient')
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createAppointment,
    getDoctorAppointmentById,
    getPatientAppointmentById
};
