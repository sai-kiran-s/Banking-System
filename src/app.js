const express = require('express');
const bodyParser = require('body-parser');
const { query, connect } = require('./db');
const morgan = require('morgan');
const app = express();
app.disable("x-powered-by");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

console.log(`connecting to SQL Server...`);
connect(function (err) {
  if (err) {
    console.log(`Cannot connect to SQL Server`);
    process.exit(1);
  }
  else {
    console.log('successfully connected to SQL server');
  }
});

app.use('/api', require('./api'))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));