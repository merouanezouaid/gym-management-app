const express = require("express");
const mysql = require("mysql");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config()

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// TODO: Improve Authentication by using JWT

const session = require("express-session"); // auth sessions

// Routes
const db = require("./src/api/models/auth");
const Role = db.role;

const Member = require("./src/api/models/members");
const memberRoutes = require("./src/api/routes/member.routes");

const Trainer = require("./src/api/models/trainers");
const trainerRoutes = require("./src/api/routes/trainer.routes");

const SportType = require("./src/api/models/sportTypes");
const sportTypeRoutes = require("./src/api/routes/sportType.routes");

const products = require("./src/api/models/products");
const productsRoutes = require("./src/api/routes/product.routes");

const scheduleRoutes = require("./src/api/routes/schedule.routes");

const paymentRoutes = require("./src/api/routes/payment.routes");

const notificationRoutes = require("./src/api/routes/notification.routes");

const dashboardRoutes = require("./src/api/routes/dashboard.routes");

// password encryption
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());

//serve static files
app.use(express.static(`${__dirname}`));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/Images', express.static('Images'));

app.use(
  cors({
    origin: ["https://gym-management-system-eight.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://gym-management-system-eight.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use(
  session({
    key: "userId",
    secret: "theateam",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// mongoose connection

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
    }
  )
  .then((response) => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

require("./src/api/routes/auth.routes")(app);
require("./src/api/routes/user.routes")(app);

app.use("/api/members", memberRoutes);

app.use("/api/trainers", trainerRoutes);

app.use("/api/sportTypes", sportTypeRoutes);

app.use("/api/schedule", scheduleRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productsRoutes);

const multer = require("multer");

// file upload handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// app.get("/dashboard", async (req, res) => {
//   Promise.all([
//     Member.countDocuments({}),
//     Trainer.countDocuments({}),
//     SportType.countDocuments({}),
//   ]).then(([mem, tra, spo]) => {
//     res.send({
//       members: mem,
//       trainers: tra,
//       sports: spo,
//     });
//   });
// });

app.post("/upload/member", upload.single("image"), async (req, res) => {
  console.log(req);
  if (!req.file) {
    console.log("No file upload");
  } else {
    const cin = req.body.imageid;
    const imgsrc = process.env.BASE_URL + "/Images/" + req.file.filename;
    try {
      await Member.findOneAndUpdate(
        { cin: cin },
        { profilePic: imgsrc },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log("-------------ADDED PICTURE---------------");
    } catch (err) {
      res.send({ error: err });
    }
  }
});

app.post("/upload/trainer", upload.single("image"), async (req, res) => {
  console.log(req);
  if (!req.file) {
    console.log("No file upload");
  } else {
    const cin = req.body.imageid;
    const imgsrc = process.env.BASE_URL + "/Images/" + req.file.filename;
    try {
      await Trainer.findOneAndUpdate(
        { cin: cin },
        { profilePic: imgsrc },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log("-------------ADDED PICTURE---------------");
    } catch (err) {
      res.send({ error: err });
    }
  }
});
app.post("/upload/sportType", upload.single("image"), async (req, res) => {
  console.log(req);
  if (!req.file) {
    console.log("No file upload");
  } else {
    const sportname = req.body.fileName;
    const imgsrc = process.env.BASE_URL + "/Images/" + req.file.filename;
    try {
      await SportType.findOneAndUpdate(
        { name: sportname },
        { sportPic: imgsrc },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log("-------------ADDED PICTURE OF Sport type---------------");
    } catch (err) {
      res.send({ error: err });
    }
  }
});

app.post("/upload/products", upload.single("image"), async (req, res) => {
  console.log(req);
  if (!req.file) {
    console.log("No file upload");
  } else {
    const name = req.body.productName;
    const imgsrc = process.env.BASE_URL + "/Images/" + req.file.filename;
    
    try {
      await products.findOneAndUpdate(
        { productName: name },
        { profilePic: imgsrc },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log("-------------ADDED PICTURE---------------");
    } catch (err) {
      res.send({ error: err });
    }
  }
});

// server listening to lofi port 3001 🎶
if(process.env.API_PORT){
  app.listen(process.env.API_PORT, () => {
    console.log("running server");
  });
}

module.exports = app;
