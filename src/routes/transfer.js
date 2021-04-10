const express = require('express')
const router = express.Router();
const { query } = require('../db')
const moment = require('moment');
const withTransaction = require('../helpers/withTransaction')
router.post('/', async (req, res) => {
  try {
    await withTransaction( async () => {
      let { sender_account_number, receiver_account_number, amount } = req.body;
      let datetime = moment(new Date()).utc(true).format()
      await query(`INSERT INTO TRANSACTION VALUES('${sender_account_number}','${receiver_account_number}','${datetime}','${amount}');`);
      let sender_account_balance = await query(`SELECT account_balance FROM CUSTOMER where account_number='${sender_account_number}';`);
      if(sender_account_balance[0].account_balance - amount<0){
        return res.status(500).send({ message: "You have insufficient balance!" })
      }
      let balance = sender_account_balance[0].account_balance - amount
      await query(`UPDATE CUSTOMER SET account_balance='${balance}' where account_number='${sender_account_number}';`);
      let receiver_account_balance = await query(`SELECT account_balance FROM CUSTOMER where account_number='${receiver_account_number}';`);
      balance = receiver_account_balance[0].account_balance + amount;
      await query(`UPDATE CUSTOMER SET account_balance='${balance}' where account_number='${receiver_account_number}';`);
      return res.status(200).send({ message: "Transfer successful!" })
    } );
  } catch ( error ) {
    return res.status(500).send({ error: error })
  }
})
module.exports = router;