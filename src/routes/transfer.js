const express = require('express')
const router = express.Router();
const { query } = require('../db')
const moment = require('moment');
const withTransaction = require('../helpers/withTransaction')
router.post('/', async (req, res) => {
  try {
    await withTransaction(async () => {
      let { sender_account_number, receiver_account_number, amount } = req.body;
      let datetime = moment(new Date()).utc(true).format()
      let sender_account_balance = await query(`SELECT account_balance FROM customer where account_number='${sender_account_number}';`);
      console.log(sender_account_balance);
      console.log(sender_account_balance[0]);
      console.log(sender_account_balance[0].account_balance);
      console.log(amount);
      if (sender_account_balance[0].account_balance - amount < 0) {
        console.log("hello");
        throw new Error("Sender has insufficient balance!")
      }
      let balance = sender_account_balance[0].account_balance - amount
      let result1 = await query(`UPDATE customer SET account_balance='${balance}' where account_number='${sender_account_number}';`);
      console.log(result1);
      let receiver_account_balance = await query(`SELECT account_balance FROM customer where account_number='${receiver_account_number}';`);
      console.log(receiver_account_balance);
      balance = receiver_account_balance[0].account_balance + amount;
      let result2 = await query(`UPDATE customer SET account_balance='${balance}' where account_number='${receiver_account_number}';`);
      console.log(result2);
      let result3 = await query(`INSERT INTO transaction VALUES('${sender_account_number}','${receiver_account_number}','${datetime}','${amount}');`);
      console.log(result3);
      return res.status(200).send({ message: "Transfer successful!" })
    });
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
})
module.exports = router;