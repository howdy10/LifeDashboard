const { initializeApp } = require("firebase-admin/app");
const { getDatabase } = require("firebase-admin/database");
const { onValueWritten } = require("firebase-functions/v2/database");
const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");

initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//This function needs permissions to be called
// Steps can be found: https://cloud.google.com/run/docs/authenticating/public#console-ui
exports.createTestDbSecondGen = onRequest({}, (req, res) => {
  const db = getDatabase();
  const sourceRef = db.ref("family/a70b3195-4787-4509-8d08-cfeb49761524");
  const targetRef = db.ref("family/test");

  sourceRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        targetRef.set(snapshot.val());
        res.send("Database has been copied to test profile");
      } else {
        res.send("No data avaliable");
      }
    })
    .catch((error) => {
      res.send(`Error pulling data: ${error}`);
    });
});

exports.endingBalanceUpdateSecondGen = onValueWritten(
  "family/{familyId}/Balance/{year}/{month}/spent",
  (event) => {
    if (!event.data.after.exists()) {
      //if deleted
      logger.info(`Was being deleted`);
      return null;
    }
    const familyId = event.params.familyId;
    const year = event.params.year;
    const month = event.params.month;
    const today = new Date(year, month, 1);
    logger.info(`Call made for ${month}/${year}`);

    today.setMonth(today.getMonth() - 1);
    const prevMonth = today.getMonth();
    const prevMonthYear = today.getFullYear();

    const spent = event.data.after.val();

    const db = getDatabase();
    const balanceRef = db.ref(`family/${familyId}/Balance`);
    const endBalanceRef = db.ref(`family/${familyId}/Balance/${year}/${month}/endingBalance`);

    balanceRef
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          var lastBalance = snapshot
            .child(prevMonthYear)
            .child(prevMonth)
            .child("endingBalance")
            .val();
          var payChecks = snapshot.child(year).child(month).child("payChecks").val();

          let paidThisMonth = 0;
          if (payChecks) {
            Object.keys(payChecks).map((key, index) => (paidThisMonth += payChecks[key].amount));
          }
          let currentBalance = lastBalance + paidThisMonth - spent;

          logger.info(`Today date: ${month} Year: ${year}`);
          logger.info(`last balance: ${lastBalance}`);
          logger.info(`paid this month: ${paidThisMonth}`);
          logger.info(`Ending Balance: ${currentBalance}`);
          endBalanceRef.set(Math.round((currentBalance + Number.EPSILON) * 100) / 100);
        } else {
          logger.error(`Did not find paychecks for month ${month}, year ${year}`);
        }
      })
      .catch((error) => {
        logger.error(`Error pulling data: ${error}`);
      });
  }
);

exports.savingBucketAmountUpdateSecondGen = onValueWritten(
  "family/{familyId}/Savings/bucketTransactions/{bucketId}",
  (event) => {
    const familyId = event.params.familyId;
    const bucketId = event.params.bucketId;

    let bucketSum = 0;
    const transactionList = event.data.after.val();
    Object.keys(transactionList).map(
      (key, index) => (bucketSum += transactionList[key].amount ?? 0)
    );

    logger.info(`Family Id updating: ${familyId}`);
    logger.info(`Bucket Id: ${bucketId}`);
    logger.info(`Amount updating: ${bucketSum}`);

    return event.data.after.ref.parent.parent
      .child("buckets")
      .child(bucketId)
      .child("amount")
      .set(bucketSum);
  }
);
