const router = require('express').Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const NewspaperEntry = mongoose.model('NewspaperEntry');

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
router.post('/', newspaperEntryListSchema, function(req, res, next){
    req.body.forEach(element => {
        NewspaperEntry.create(element, function(err, entry){
            if (err) return next(err);
        })
    });

    return res.json(req.body);
})

// Endpoint to update an entry identified by an id
router.put('/:id', newspaperEntrySchema, function(req, res, next){
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

const entrySchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
    link: Joi.string().required(),
    abstract: Joi.string().required(),
    publisher: {
        id: Joi.number().required(),
        name: Joi.string().required(),
        joined_date: Joi.date().required()
    },
    languages: Joi.array()
});

function newspaperEntrySchema(req, res, next){
    validateRequest(req, next, entrySchema);
}

function newspaperEntryListSchema(req, res, next){
    const entryListSchema = Joi.array().items(entrySchema);

    validateRequest(req, next, entryListSchema);
}

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true, 
        stripUnknown: true 
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

module.exports = router;