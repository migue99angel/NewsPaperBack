const router = require('express').Router();
const mongoose = require('mongoose');

const NewspaperEntry = mongoose.model('NewspaperEntry');

router.get('/', function(req, res){
    NewspaperEntry.find({})
        .then(function(entry){
            console.log(entry);
            return res.json({'entry': entry})
        })
})

module.exports = router;