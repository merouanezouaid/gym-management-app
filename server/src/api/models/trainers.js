const mongoose = require('mongoose');
const SportType = require('./sportTypes');
const Schedule = require('./schedule');

const TrainerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  profilePic: {
    type: Object,
  },
  birthday: { 
    type: Date,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
    required: [true, "Email required"]
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  cin: {
    type: String,
    unique: true  
  },
  sportTypes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sportType"
    }
  ]
});

TrainerSchema.pre('findByIdAndRemove', function(next) {
  Schedule.deleteMany({trainer: this._id});
  SportType.deleteMany({trainer: this._id});
  next();
});

const Trainer = mongoose.model('trainer', TrainerSchema);

module.exports = Trainer;