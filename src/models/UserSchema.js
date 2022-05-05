import joi from 'joi';

const UserSchema = joi
  .object({
    name: joi.string().min(1),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirmPassword: joi.ref('password'),
  })
  .with('confirmPassword', 'password');

export default UserSchema;
