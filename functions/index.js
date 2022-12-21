const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

var database = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.createTestDb = functions.https.onRequest((req, resp) => {
  database
    .ref("family/a70b3195-4787-4509-8d08-cfeb49761524")
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        database.ref(`family/test`).set(snapshot.val());
        resp.send("Database has been copied to test profile");
      } else {
        resp.send("No data avaliable");
      }
    })
    .catch((error) => {
      resp.send(`Error pulling data: ${error}`);
    });
});

exports.endingBalanceUpdate = functions.database
  .ref("family/{familyId}/Budget/{year}/{month}/spent")
  .onWrite((change, context) => {
    if (!change.after.exists()) {
      //if deleted
      functions.logger.info(`Was being deleted`);
      return null;
    }
    const familyId = context.params.familyId;
    const year = context.params.year;
    const month = context.params.month;
    const today = new Date(year, month, 1);

    today.setMonth(today.getMonth() - 1);
    const prevMonth = today.getMonth();
    const prevMonthYear = today.getFullYear();

    const spent = change.after.val();

    database
      .ref(`family/${familyId}/Budget`)
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

          functions.logger.info(`Today date: ${month} Year: ${year}`);
          functions.logger.info(`last balance: ${lastBalance}`);
          functions.logger.info(`paid this month: ${paidThisMonth}`);
          functions.logger.info(`Ending Balance: ${currentBalance}`);
          database
            .ref(`family/${familyId}/Budget/${year}/${month}/endingBalance`)
            .set(Math.round((currentBalance + Number.EPSILON) * 100) / 100);
        } else {
          functions.logger.error(`Did not find paychecks for month ${month}, year ${year}`);
        }
      })
      .catch((error) => {
        functions.logger.error(`Error pulling data: ${error}`);
      });
  });

exports.savingBucketAmountUpdate = functions.database
  .ref("family/{familyId}/Savings/bucketTransactions/{bucketId}")
  .onWrite((change, context) => {
    const familyId = context.params.familyId;
    const bucketId = context.params.bucketId;

    let bucketSum = 0;
    const transactionList = change.after.val();
    Object.keys(transactionList).map(
      (key, index) => (bucketSum += transactionList[key].amount ?? 0)
    );

    functions.logger.info(`Family Id updating: ${familyId}`);
    functions.logger.info(`Bucket Id: ${bucketId}`);
    functions.logger.info(`Amount updating: ${bucketSum}`);
    return change.after.ref.parent.parent
      .child("buckets")
      .child(bucketId)
      .child("amount")
      .set(bucketSum);
  });
