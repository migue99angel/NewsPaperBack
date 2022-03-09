const router = require('express').Router();
const NewspaperEntry = mongoose.model('NewspaperEntry');

router.get('titles', function(req, res, next){
    NewspaperEntry.findById(req.payload.id).then(function(entry){
        if(!entry){ return res.sendStatus(404); }

        return res.json({'entry': entry})
    })
})