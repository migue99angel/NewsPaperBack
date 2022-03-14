const Joi = require('joi');

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

module.exports = entrySchema;
