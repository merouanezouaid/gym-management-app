const Member = require("./../models/members");
const Trainer = require("./../models/trainers");
const SportType = require("./../models/sportTypes");
const Payment = require("./../models/payments");
const Notifications = require("./../models/notifications");
const Schedule = require("./../models/schedule");

exports.getData = async (req, res) => {
  try {
    const today = new Date();
    const day = today.getDay();
    const monthDate = new Date(today.setMonth(today.getMonth() - 1));

    const membersCount = await Member.countDocuments({});
    const trainersCount = await Trainer.countDocuments({});

    const unpaidCount = await Payment.countDocuments({ credit: { $gt: 0 } });

    const membersPerMonth = await Member.countDocuments({
      createdAt: { $gte: monthDate },
    });

    const payments = await Payment.find();

    const table = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const monthlySubs = await Member.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          subs: { $sum: 1 },
        },
      },
    ]);

    await monthlySubs.forEach((item) => {
      table[item._id] = item.subs;
    });

    const sportsIncome = await Payment.aggregate([
      {
        $group: {
          _id: "$sportType",
          income: { $sum: "$amount" },
        },
      },
    ]);

    const sportTypesByIncome = await Promise.all(
      sportsIncome.map(async (i) => {
        const sport = await SportType.findById(i._id);
        const income = i.income;
        return { sport, income };
      })
    );

    const totalIncome = payments.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);

    const notifications = await Notifications.find({});

    const todaySchedule = await Schedule.find({
      $or: [
        {
          daysOfWeek: { $exists: true, $ne: [], $in: [day] },
        },
        {
          $and: [
            {
              start: { $lte: new Date() },
              end: { $gt: new Date() },
            },
          ],
        },
      ],
    });

    const sportsMembers = await Payment.aggregate([
      {"$group" : {_id:"$sportType", count:{$sum:1}}}
  ])

  const sportsByMembers = await Promise.all(
    sportsMembers.map(async (i) => {
      const sport = await SportType.findById(i._id);
      const members = i.count;
      return { sport, members };
    })
  );

    // await console.log(todaySchedule);
    await res.send({
      membersCount,
      trainersCount,
      totalIncome,
      membersPerMonth,
      unpaidCount,
      table,
      sportTypesByIncome,
      notifications,
      todaySchedule,
      sportsByMembers
    });
    // res.send({ memberscount });
  } catch (err) {
    console.log(err);
  }
};
