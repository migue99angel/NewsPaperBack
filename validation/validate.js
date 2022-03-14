const validateRequest = require('../middlewares/validateRequest');
const entrySchema = require('./schemas/inputEntrySchema');
const Joi = require('joi');

const newspaperEntrySchema = (req, res, next) => {
    validateRequest(req, next, entrySchema);
}

const  newspaperEntryListSchema = (req, res, next) => {
    const entryListSchema = Joi.array().items(entrySchema);

    validateRequest(req, next, entryListSchema);
}


module.exports = {newspaperEntrySchema, newspaperEntryListSchema};