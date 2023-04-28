const SportType = require("./../models/sportTypes")
const Trainer = require("./../models/trainers")


exports.addSportType = async (req, res) => {  // req needs to have (trainerID, sportType)
    try {
        const sportType = await SportType.create(req.body)
        await Trainer.findByIdAndUpdate(req.body.trainerid,
            { $push: { sportTypes: sportType._id } },
            { new: true, useFindAndModify: false });

        const trainerinfo = await Trainer.findById(req.body.trainerid).populate("sportTypes")
        // console.log(trainerinfo);
        // console.log(sportType);
        res.send("added")


    }
    catch(err) {
        res.send(err)
      }
  };
exports.getSportTypes = async (req, res) => {
    try {
        const sport = await SportType.find();

        res.send(sport)
    } catch(err){
        console.log(err);
    }
}

exports.deleteSportType = async (req, res) => {
    const id = req.params.id;
    try{
      await SportType.findByIdAndRemove(id).exec();
      res.send("deleted");
    }
    catch(err) {
      res.send({error: err})
    }
}
