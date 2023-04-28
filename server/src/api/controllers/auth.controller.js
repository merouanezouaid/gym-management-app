const config = require("../../config/auth.config");
const db = require("../models/auth");

const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        name: { $in: req.body.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = roles.map((role) => role._id);
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      }
    );
  });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
exports.changePassword = async (req, res) => {
  // Get User
  let user = await User.findOne({
    email: req.body.email,
  }).populate("roles", "-__v")
    .exec();

  // Validate Password
  var passwordIsValid = bcrypt.compareSync(
    req.body.passwords.curr_password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      message: "Invalid Password!",
    });
  }
  
  // Update user password
  await User.findOneAndUpdate({ email: req.body.email },{
    password: bcrypt.hashSync(req.body.passwords.password, 8),
  });

  // Send a response
  return res.status(200).send({
    message: "Password Updated Successfully !",
  });
};

exports.getUsers = async (req, res) => {
  try{
    const users = await User.find({}).populate('roles')
    res.status(200).send(users)

  }catch(err){
    res.status(500).send({message: err})
  }
}
