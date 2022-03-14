const router = require('express').Router();
const mongoose = require('mongoose');

const NewspaperEntry = mongoose.model('NewspaperEntry');
const validate = require('../validation/validate')

// Endpoint to list every entry in the database
router.get('/list', function(req, res, next){
    NewspaperEntry.find(function(err, entries){
        if(err) return next(err);

        res.json(entries);
    })
})

// Endpoint to search some text in the database
router.get('/', function(req, res, next){
    const terms = req.query.terms
    if(terms != undefined){
        NewspaperEntry.find({'$or': [
            { 'title' : { '$regex' : terms, '$options' : 'i' } } ,
            { 'abstract' : { '$regex' : terms, '$options' : 'i' } } 
        ]}
            ,function(err, entries){
            if(err) return next(err);
    
            res.json(entries);
        })
    }else{
        res.json([])
    }

})

// Endpoint to find entries in an id list
router.get('/:id', function(req, res, next){
    idList = req.params.id.split(',')
    NewspaperEntry.find({ id : { $in : idList } }, function(err, entry){
        if (err) return next(err);
        
        res.json(entry);
    })
})

// Endpoint to create an entry list
router.post('/', validate.newspaperEntryListSchema, function(req, res, next){
    req.body.forEach(element => {
        NewspaperEntry.create(element, function(err, entry){
            if (err) return next(err);
        })
    });

    return res.json(req.body);
})

// Endpoint to update an entry identified by an id
router.put('/:id', validate.newspaperEntrySchema, function(req, res, next){
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