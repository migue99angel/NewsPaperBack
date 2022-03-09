var router = require('express').Router();

router.use('/titles', require('./api'));

module.exports = router