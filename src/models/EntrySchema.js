import joi from 'joi';

const EntrySchema = joi.object({
  value: joi.number().required(),
  desc: joi.string().required(),
  type: joi.valid('positive', 'negative'),
  date: joi.string(),
});

export default EntrySchema;
