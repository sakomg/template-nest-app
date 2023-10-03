import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production'),
  SF_INSTANCE_URL: Joi.string().required(),
  SF_REDIRECT_URI: Joi.string().required(),
  SF_CLIENT_ID: Joi.string().required(),
  SF_CLIENT_SECRET: Joi.string().required(),
  SF_USERNAME: Joi.string().required(),
  SF_PASSWORD: Joi.string().required(),
});
