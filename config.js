import { config } from 'dotenv';

config();

export const env = {
    google: {
        apiKey: process.env.GOOGLE_API_KEY,
        model: process.env.GOOGLE_API_MODEL
    },
    groq: {
        apiKey: process.env.GROQ_API_KEY,
        model: process.env.GROQ_API_MODEL
    }
};

