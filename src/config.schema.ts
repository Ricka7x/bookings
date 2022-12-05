import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
});
