
const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    appointmentDate: {
        type: String,
        required: true,
    },
    time: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'canceled'],
        default: 'scheduled',
    },
    disease: {
        type: String,
        required:true
    },   
});

const AppointmentModel = mongoose.model('appointments', appointmentSchema);
module.exports = AppointmentModel;