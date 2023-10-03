export const configuration = () => ({
  SF_INSTANCE_URL: process.env.SF_INSTANCE_URL,
  PORT: parseInt(process.env.PORT, 10) || 3001,
});
