const express = require('express')
const mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect('mongodb://localhost/Celtiberian')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

require('./models/newspapers');

const app = express()
const port = 3000

app.use(require('./routes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
