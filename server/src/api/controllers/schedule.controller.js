const Schedule = require("./../models/schedule")


exports.addSchedule = async (req, res) => {  
    try {
        const event = await Schedule.create(req.body)
        res.send("added")
    }
    catch(err) {
        res.send(err)
      }
  };

exports.getSchedules = async (req, res) => {
    try {
        const events = await Schedule.find().populate('trainer').populate('sportType');
        console.log(events)

        res.send(events)
    } catch(err){
        console.log(err);
    }
}