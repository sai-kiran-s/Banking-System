const express = require('express');
const router = express.Router();

router.use('/viewtransactions', require('./routes/viewtransactions'));
router.use('/viewcustomers',require('./routes/viewcustomers'))
router.use('/transfer',require('./routes/transfer'))

module.exports = router;