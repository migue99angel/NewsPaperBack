const router = require('express').Router();
const mongoose = require('mongoose');

const NewspaperEntry = mongoose.model('NewspaperEntry');

// Endpoint to list every entry in the database
router.get('/', function(req, res, next){
    NewspaperEntry.find(function(err, entries){
        if(err) return next(err);

        res.json(entries);
    })
})

// Endpoint to find a entry with the id
router.get('/:id', function(req, res, next){
    NewspaperEntry.findOne({id: req.params.id}, function(err, entry){
        if (err) return next(err);
        
        res.json(entry);
    })
})

// Endpoint to create an entry
router.post('/', function(req, res, next){
    NewspaperEntry.create(req.body, function(err, entry){
        if (err) return next(err);

        res.json(entry);
    })
})

// Endpoint to update an entry identified by an id
router.put('/:id', function(req, res, next){
    NewspaperEntry.findOneAndUpdate({id: req.params.id}, req.body, {new: true},function(err, entry){
        if(err) return next(err);

        res.json(entry);
    })
})

// Endpoint to delete an entry identified by an id
router.delete('/:id', function(req, res, next){
    NewspaperEntry.findOneAndDelete({id: req.params.id}, function(err, entry){
        if(err) return next(err);

        res.json(entry);
    })
})

module.exports = router;