const Payment = require("./../models/payments");

exports.addPayment = async (req, res) => {
  try {
    const pay = await Payment.create(req.body);
    res.send("added");
  } catch (err) {
    res.send(err);
  }
};

exports.getPayments = async (req, res) => {
  try {
    const pays = await Payment.find().populate("member").populate("sportType");
    console.log(pays);

    res.send(pays);
  } catch (err) {
    console.log(err);
  }
};
