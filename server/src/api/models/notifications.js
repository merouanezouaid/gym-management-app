const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
  },
  type: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  isUnRead: {
    type: Boolean,
  },
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
