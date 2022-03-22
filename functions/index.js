const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

var database = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.endingBalance = functions.https.onRequest((request, response) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const prevMonth = month - 1;
  database
    .ref("family/a70b3195-4787-4509-8d08-cfeb49761524/Budget")
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        var lastBalance = snapshot.child(year).child(prevMonth).child("endingBalance").val();
        var spent = snapshot.child("current").child("spent").val();
        var payChecks = snapshot.child(year).child(month).child("payChecks").val();

        let paidThisMonth = 0;
        if (payChecks) {
          Object.keys(payChecks).map((key, index) => (paidThisMonth += payChecks[key].amount));
        }
        let currentBalance = lastBalance + paidThisMonth - spent;

        functions.logger.info(`last balance: ${lastBalance}`);
        functions.logger.info(`paid this month: ${paidThisMonth}`);
        functions.logger.info(`Current Balance: ${currentBalance}`);
        database
          .ref(`family/a70b3195-4787-4509-8d08-cfeb49761524/Budget/${year}/${month}/endingBalance`)
          .set(Math.round((currentBalance + Number.EPSILON) * 100) / 100);
      } else {
        functions.logger.error("No data avaliable");
      }

      response.send(`Ending balance for ${month + 1}/${year} has been set`);
    })
    .catch((error) => {
      functions.logger.error(`Error pulling data: ${error}`);
    });
});
