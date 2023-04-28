const express = require('express')
const path = require("path");

const trainerController = require('./../controllers/trainer.controller')


const router = express.Router();

router.route('/')
.get(trainerController.getAllTrainers)
.post( trainerController.addTrainer)



router.route('/:id')
.get(trainerController.getTrainer)
.patch(trainerController.updateTrainer)
.delete(trainerController.deleteTrainer)

module.exports = router;
