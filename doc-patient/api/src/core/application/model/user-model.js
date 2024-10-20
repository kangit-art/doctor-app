
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['patient', 'doctor'],
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointments',
    }],
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
