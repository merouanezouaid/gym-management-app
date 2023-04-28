const express = require('express')

const sportTypeController = require('./../controllers/sportTypes.controller')


const router = express.Router();

router.route('/')
.post(sportTypeController.addSportType)
.get(sportTypeController.getSportTypes)



// .get(memberController.getAllMembers)



router.route('/:id')
.delete(sportTypeController.deleteSportType)
// .get(memberController.getMember)
// .patch(memberController.updateMember)

module.exports = router;