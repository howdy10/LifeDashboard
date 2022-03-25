const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

var database = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.endingBalanceSchedule = functions.pubsub
  .schedule("30 23 * * *")
  .timeZone("America/Phoenix")
  .onRun((context) => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const year = today.getFullYear();
    const month = today.getMonth();

    today.setMonth(today.getMonth() - 1);
    const prevMonth = today.getMonth();
    const prevMonthYear = today.getFullYear();

    database
      .ref("family/a70b3195-4787-4509-8d08-cfeb49761524/Budget")
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          var lastBalance = snapshot
            .child(prevMonthYear)
            .child(prevMonth)
            .child("endingBalance")
            .val();
          var spent = snapshot.child("current").child("spent").val();
          var payChecks = snapshot.child(year).child(month).child("payChecks").val();

          let paidThisMonth = 0;
          if (payChecks) {
            Object.keys(payChecks).map((key, index) => (paidThisMonth += payChecks[key].amount));
          }
          let currentBalance = lastBalance + paidThisMonth - spent;

          functions.logger.info(`Today date: ${month} Year: ${year}`);
          functions.logger.info(`Previous Month date: ${prevMonth} Year: ${prevMonthYear}`);
          functions.logger.info(`Context time ${context.timestamp}`);
          functions.logger.info(`last balance: ${lastBalance}`);
          functions.logger.info(`paid this month: ${paidThisMonth}`);
          functions.logger.info(`Current Balance: ${currentBalance}`);
          database
            .ref(
              `family/a70b3195-4787-4509-8d08-cfeb49761524/Budget/${year}/${month}/endingBalance`
            )
            .set(Math.round((currentBalance + Number.EPSILON) * 100) / 100);
        } else {
          functions.logger.error("No data avaliable");
        }
      })
      .catch((error) => {
        functions.logger.error(`Error pulling data: ${error}`);
      });
    return null;
  });
