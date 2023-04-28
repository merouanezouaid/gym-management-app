const express = require('express')

const scheduleController = require('./../controllers/schedule.controller')


const router = express.Router();

router.route('/')
.post(scheduleController.addSchedule)
.get(scheduleController.getSchedules)


module.exports = router;