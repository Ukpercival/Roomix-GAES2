const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    place: String,
    checkin: Date,
    checkout: Date,
    people: Number,
    payment: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;