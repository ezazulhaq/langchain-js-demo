import { config } from 'dotenv';

config();

export const env = {
    apiKey: process.env.GOOGLE_API_KEY,
    groq: {
        apiKey: process.env.GROQ_API_KEY,
        model: process.env.GROQ_API_MODEL
    }
};

