const mongoose = require('mongoose');
const GuestSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const Guest = mongoose.model('Guest', GuestSchema, 'guests');

module.exports = Guest;