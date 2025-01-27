import { config } from 'dotenv';

config();

export const env = {
    apiKey: process.env.GOOGLE_API_KEY,
};

