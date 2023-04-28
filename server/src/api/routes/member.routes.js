const express = require('express')
const path = require("path");

const memberController = require('./../controllers/members.controller')


const router = express.Router();

router.route('/')
.get(memberController.getAllMembers)
.post( memberController.addMember)



router.route('/:id')
.get(memberController.getMember)
.patch(memberController.updateMember)
.delete(memberController.deleteMember)

router.route('/card/:id')
.get(memberController.generateCard);

module.exports = router;

