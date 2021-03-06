const express = require('express')
const router = express.Router();
const {query} = require('../db')

router.get('/all',async (req,res)=>{
  try{
    let result = await query(`SELECT * FROM transaction;`);
    return res.status(200).send({transactions:result})
  }
  catch(err){
    return res.status(500).send({message:err})
  }
})

router.get('/:account_number',async (req,res)=>{
  try{
    let acc_no = req.params.account_number  
    let result = await query(`SELECT * FROM transaction where sender_account_number LIKE '${acc_no}' or receiver_account_number LIKE '${acc_no}';`);
    return res.status(200).send({transactions:result})
  }
  catch(err){
    return res.status(500).send({message:err})
  }
})

module.exports = router;