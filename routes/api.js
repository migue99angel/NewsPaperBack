const router = require('express').Router();
const mongoose = require('mongoose');

const NewspaperEntry = mongoose.model('NewspaperEntry');
const validate = require('../validation/validate');

// Endpoint to list every entry in the database
router.get('/list', function (req, res, next) {
  NewspaperEntry.find({})
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Endpoint to search some text in the database
router.get('/', function (req, res, next) {
  const terms = req.query.terms;
  if (terms !== undefined) {
    NewspaperEntry.find({
      $or: [
        { title: { $regex: terms, $options: 'i' } },
        { abstract: { $regex: terms, $options: 'i' } }
      ]
    }
    , function (err, entries) {
      if (err) return next(err);

      res.json(entries);
    });
  } else {
    res.json([]);
  }
});

// Endpoint to find entries in an id list
router.get('/:id', function (req, res, next) {
  const idList = req.params.id.split(',');
  NewspaperEntry.find({ id: { $in: idList } })
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Endpoint to create an entry list
router.post('/', validate.newspaperEntryListSchema, function (req, res, next) {
  NewspaperEntry.create(req.body)
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Endpoint to update an entry identified by an id
router.put('/:id', validate.newspaperEntrySchema, function (req, res, next) {
  NewspaperEntry.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Endpoint to delete an entry identified by an id
router.delete('/:id', function (req, res, next) {
  NewspaperEntry.findOneAndDelete({ id: req.params.id })
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
