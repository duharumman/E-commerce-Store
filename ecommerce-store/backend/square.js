import { ApiError, Client, Environment } from "square"

import { isProduction } from './config.js';

const client = new Client({
  environment: isProduction ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export { ApiError, client };
