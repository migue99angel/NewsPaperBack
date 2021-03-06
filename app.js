const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// connect to MongoDB
mongoose.connect('mongodb://localhost/Newspaper')
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

require('./models/newspapers');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./routes'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
