import { config } from 'dotenv';

// import * as logger from './logger.js';

// package.json sets NODE_ENV in its scripts
export const isProduction = process.env.NODE_ENV === 'production';

// load configuration based on environment
const { error } = config();

if (error) {
  console.error(`Error loading configuration: ${error}`);
}
