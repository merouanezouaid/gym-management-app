const Category = require("../models/categories");
const Member = require("./../models/members")

const formatPhone = require("./../utils/formatNumber")

const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");


exports.addMember = async (req, res) => {
    try {
        const member = Member.create(req.body);
        res.send(member)
    } catch(err) {
    
      console.log(err);
    }
}
exports.getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.send(members)
    } catch(err){
        console.log(err);
    }
}

exports.deleteMember = async (req, res) => {
    const id = req.params.id;
    try{
      await Member.findByIdAndRemove(id).exec();
      res.send("deleted");
    }
    catch(err) {
      res.send({error: err})
    }
}
exports.getMember = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try{
      const member = await Member.findById(id).exec();
      res.send(member);
    }
    catch(err) {
      res.send({error: err})
    }
}

exports.generateCard = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try{
    const member = await Member.findById(id).lean().exec();


    member.birthday = (new Date(member.birthday)).toLocaleDateString("en-US");

    member.phoneNumber = formatPhone(member.phoneNumber)


    // Get card HTML
    var cardHTML = fs.readFileSync(path.join(__dirname, '..', '..', 'views', 'card.html'), "utf8");

    // Set pdf package options
    var options = {
        height: "350",
        width: "700",
        orientation: "landscape"
    };

    // Set pdf document properties: HTML, Data and output file
    var document = {
        html: cardHTML,
        data: {
          user: member,
        },
        type: 'buffer'
    };

    // Generate PDF
    pdf.create(document, options)
        .then((file) => {
            // Output PDF
            res.header('content-type', 'application/pdf');
            res.send(file);
        })
        .catch((error) => {
          res.send({error: error})
        });
  }
  catch(err) {
    res.send({error: err})
  }
}

exports.updateMember = async (req, res) => {
    const id = req.params.id;
    try{
      await Member.findByIdAndUpdate(id, req.body, {
          new: true, 
          runValidators: true
      });
      res.send("updated");
    }
    catch(err) {
      res.send({error: err})
    }
}

// exports.addPicture = async (req, res) => {
//   if (!req.file) {
//     console.log("No file upload");
//   } else {
//     const cin = req.body.imageid;
//     const imgsrc = "http://127.0.0.1:3001/Images/" + req.file.filename;
//     try{
//       await Member.findOneAndUpdate({cin: cin}, {profilePic: imgsrc}, {
//           new: true, 
//           runValidators: true
//       });
//       console.log('-------------ADDED PICTURE---------------');
//     }
//     catch(err) {
//       res.send({error: err})
//     }
//   }
// };