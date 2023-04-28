const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    sportType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sportType"
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "trainer"
    },
    start: {
        type: String,
    },
    end: {        
        type: String,
    },
    startTime: {   // in the front we'll convert it to just hours minutes seconds
        type: String,
    },
    endTime: {
        type: String,
    },
    daysOfWeek: { // optional just for recurring events
        type: [Number]
    },
});

const Schedule = mongoose.model('schedule', scheduleSchema);

module.exports = Schedule;