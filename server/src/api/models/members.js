const mongoose = require("mongoose");
const Payment = require("./payments");
const Notifications = require("./notifications");

const MemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePic: {
    type: Object,
  },
  birthday: {
    type: Date,
    required: true,
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
    default: true,
  },
  hasPaid: {
    type: Boolean,
    default: true,
  },
  cin: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

MemberSchema.pre("findByIdAndRemove", async function (next) {
  await Payment.deleteMany({ member: this._id });
  await Notifications.deleteMany({ member: this._id });
  next();
});

const Member = mongoose.model("member", MemberSchema);

module.exports = Member;
