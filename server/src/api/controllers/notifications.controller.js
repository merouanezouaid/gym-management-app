const Notification = require("./../models/notifications");

exports.addNotification = async (req, res) => {
  try {
    //console.log(req.body);
    const note = await Notification.create(req.body);
    res.send("added");
  } catch (err) {
    res.send(err);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notes = await Notification.find();
    // console.log(notes);

    res.send(notes);
  } catch (err) {
    console.log(err);
  }
};
