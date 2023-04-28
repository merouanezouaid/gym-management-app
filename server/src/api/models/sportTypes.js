const mongoose = require('mongoose');
const Payment = require("./payments");

const SportTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
    },
    sportPic: {
        type: Object,
      },

});

SportTypeSchema.pre('findByIdAndRemove', function(next) {
    Payment.deleteMany({sportType: this._id});
    next();
  });

const SportType = mongoose.model('sportType', SportTypeSchema);

module.exports = SportType;