const express = require('express')
const router = express.Router();
const {query} = require('../db')

router.get('/all',async (req,res)=>{
  try{
    let result = await query(`SELECT * FROM CUSTOMER;`);
    return res.status(200).send({customers:result})
  }
  catch(err){
    return res.status(500).send({error:err})
  }
})

router.get('/showcustomer/:account_number',async (req,res)=>{
  try{
    let acc_no = req.params.account_number  
    let result = await query(`SELECT * FROM CUSTOMER where account_number LIKE '${acc_no}';`);
    return res.status(200).send({customer:result})
  }
  catch(err){
    return res.status(500).send({error:err})
  }
})

router.get('/exceptcustomer/:account_number',async (req,res)=>{
  try{
    let acc_no = req.params.account_number  
    let result = await query(`SELECT * FROM CUSTOMER where account_number not LIKE '${acc_no}';`);
    return res.status(200).send({customers:result})
  }
  catch(err){
    return res.status(500).send({error:err})
  }
})

module.exports = router;