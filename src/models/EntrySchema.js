import joi from 'joi';

const EntrySchema = joi.object({
  _id: joi.any(),
  value: joi.number().required(),
  desc: joi.string().required(),
  type: joi.valid('positive', 'negative'),
  date: joi.string(),
});

export default EntrySchema;
