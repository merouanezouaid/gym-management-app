const Trainer = require("./../models/trainers")


exports.addTrainer = async (req, res) => {
    try {
        const trainer = Trainer.create(req.body);
        res.send(trainer)
    } catch(err) {
    
      console.log(err);
    }
}
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find().populate("sportTypes");
        res.send(trainers)
    } catch(err){
        console.log(err);
    }
}

exports.deleteTrainer = async (req, res) => {
    const id = req.params.id;
    try{
      await Trainer.findByIdAndRemove(id).exec();
      res.send("deleted");
    }
    catch(err) {
      res.send({error: err})
    }
}
exports.getTrainer = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try{
      const trainer = await Trainer.findById(id).exec();
      res.send(trainer);
    }
    catch(err) {
      res.send({error: err})
    }
}

exports.updateTrainer = async (req, res) => {
    const id = req.params.id;
    try{
      await Trainer.findByIdAndUpdate(id, req.body, {
          new: true, 
          runValidators: true
      });
      res.send("updated");
    }
    catch(err) {
      res.send({error: err})
    }
}